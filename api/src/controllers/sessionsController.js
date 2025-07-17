const pgClient = require('../config/pgClient');

const index = (req, res) => {
  const sql = `
    SELECT
      s.id,
      s.session_date,
      s.session_time,
      json_build_object(
        'id', t.id,
        'name', t.name,
        'description', t.description
      ) AS trainer,
      json_build_object(
        'id', c.id,
        'name', c.name,
        'weight', c.weight,
        'height_ft', c.height_ft,
        'height_in', c.height_in
      ) AS client,
      json_agg(
        json_build_object(
          'id', r.id,
          'name', r.name
        )
      ) AS reasons
    FROM
      sessions s
      LEFT JOIN trainers t ON t.id = s.trainer_id
      LEFT JOIN clients c ON c.id = s.client_id
      LEFT JOIN client_reasons cr ON cr.session_id = s.id
      LEFT JOIN reasons r ON r.id = cr.reason_id
    GROUP BY
      s.id,
      s.session_date,
      s.session_time,
      c.id,
      c.name,
      c.weight,
      c.height_ft,
      c.height_in,
      t.id,
      t.name
    ORDER BY
      s.session_date ASC
  `;

  pgClient.query(sql)
    .then(results => {
      res.status(200).json(results.rows);
    })
    .catch((error) => {
      console.error('Sessions Controller Error:', error);
      res.status(500).json({ error: `Sessions Controller Error: ${error}.` });
    });
}

const show = (req, res) => {
  const sql = `
    SELECT
      s.id,
      s.session_date,
      s.session_time,
      json_build_object(
        'id', t.id,
        'name', t.name,
        'description', t.description
      ) AS trainer,
      json_build_object(
        'id', c.id,
        'name', c.name,
        'weight', c.weight,
        'height_ft', c.height_ft,
        'height_in', c.height_in
      ) AS client,
      json_agg(
        json_build_object(
          'id', r.id,
          'name', r.name
        )
      ) AS reasons
    FROM
      sessions s
      LEFT JOIN trainers t ON t.id = s.trainer_id
      LEFT JOIN clients c ON c.id = s.client_id
      LEFT JOIN client_reasons cr ON cr.session_id = s.id
      LEFT JOIN reasons r ON r.id = cr.reason_id
    WHERE s.id = $1
    GROUP BY
      s.id,
      s.session_date,
      s.session_time,
      c.id,
      c.name,
      c.weight,
      c.height_ft,
      c.height_in,
      t.id,
      t.name
    ORDER BY
      s.session_date ASC
  `;

  pgClient.query(sql, [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Session not found for id ${req.params.id}.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Session Controller Error: ${error}.` });
    });
}

const create = async (req, res) => {
  const session = req.body;
  let sessionId;

  try {
    await pgClient.query('BEGIN');
    const sessionResult = await pgClient.query('INSERT INTO sessions (session_date, session_time, trainer_id, client_id) VALUES ($1, $2, $3, $4) RETURNING id', [session.session_date, session.session_time, session.trainer_id, session.client_id]);
    sessionId = sessionResult.rows[0].id;

    const insertValues = session.reason_ids.map((id, index) => `($1, $${index +2})`).join(', ');
    const insertParams = [sessionId, ...session.reason_ids.map(id => parseInt(id))];
    
    const reasonSql = `
      INSERT INTO client_reasons (session_id, reason_id)
      VALUES ${insertValues}
    `;

    await pgClient.query(reasonSql, insertParams);
    await pgClient.query('COMMIT');
  }
  catch (error) {
    await pgClient.query('ROLLBACK');
    res.status(500).json({ error: `Error: ${error}.` });

    return
  }

  res.location(`/sessions/${sessionId}`);
  res.status(201).json({ message: 'Session created successfully.' });
}

const update = async (req, res) => {
  const session = req.body;

  try {
    const currentReasons = await pgClient.query('SELECT reason_id FROM client_reasons WHERE session_id = $1', [req.params.id]);
    const currentReasonIds = currentReasons.rows.map(row => row.reason_id);

    const sql = `
      UPDATE sessions SET
        session_date = $1,
        session_time = $2,
        trainer_id = $3,
        client_id = $4
      WHERE
        id = $5
    `;

    const sqlParams = [
      session.session_date,
      session.session_time,
      session.trainer_id,
      session.client_id,
      req.params.id
    ];

    await pgClient.query('BEGIN');
    await pgClient.query(sql, sqlParams);

    const removedReasons = currentReasonIds.filter(reasonId => !session.reason_ids.includes(reasonId));
    const newReasons = session.reason_ids.filter(reasonId => !currentReasonIds.includes(reasonId));

    if (removedReasons.length > 0) {
      const reasonSql = `
        DELETE FROM client_reasons
        WHERE
          session_id = $1
          AND reason_id IN (${removedReasons.join(',')})
      `;

      await pgClient.query(reasonSql, [req.params.id]);
    }

    if (newReasons.length > 0) {
      const reasonSql = `
        INSERT INTO client_reasons (session_id, reason_id)
        VALUES
          ${newReasons.map(reasonId => `(${req.params.id}, ${reasonId})`).join(',')}
      `;
      await pgClient.query(reasonSql);
    }

    await pgClient.query('COMMIT');
  }
  catch (error) {
    await pgClient.query('ROLLBACK');
    res.status(500).json({ error: `Sessions Controller Error: ${error}.` });

    return
  }

  res.status(200).json({ message: 'Session updated successfully.' });
}

const destroy = (req, res) => {
  pgClient.query('DELETE FROM sessions WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.status(200).json({ message: 'Session successfully deleted.' });
      }
      else {
        res.status(404).json({ error: 'Session not found.' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Sessions Controller Error: ${error}` });
    });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};