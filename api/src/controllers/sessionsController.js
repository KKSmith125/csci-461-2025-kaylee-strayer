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
      console.error('Recipes Controller Error:', error);
      res.status(500).json({ error: `Recipes Controller Error: ${error}.` });
    });
}

const show = (req, res) => {
  const sql = `
    SELECT
      r.id,
      r.name,
      r.description,
      json_build_object(
        'id', u.id,
        'is_admin', u.is_admin,
        'email', u.email
      ) AS user,
      json_build_object(
        'id', c.id,
        'name', c.name
      ) AS category,
      json_build_object(
        'id', a.id,
        'name', a.name
      ) AS author,
      json_agg(
        json_build_object(
          'id', i.id,
          'name', i.name
        )
      ) AS ingredients
    FROM
      recipes r
      LEFT JOIN categories c ON c.id = r.category_id
      LEFT JOIN authors a ON a.id = r.author_id
      LEFT JOIN users u ON u.id = r.user_id
      LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
      LEFT JOIN ingredients i ON i.id = ri.ingredient_id
    WHERE
      r.id = $1
    GROUP BY
      r.id,
      r.name,
      r.description,
      c.id,
      a.id,
      u.id,
      u.is_admin,
      u.email
  `;

  pgClient.query(sql, [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Recipe not found for id ${req.params.id}.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Recipes Controller Error: ${error}.` });
    });
}

const create = async (req, res) => {
  const recipe = req.body;
  let recipeId;

  try {
    await pgClient.query('BEGIN');
    const recipeResult = await pgClient.query('INSERT INTO recipes (name, description, category_id, author_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [recipe.name, recipe.description, recipe.category_id, recipe.author_id, recipe.user_id]);
    recipeId = recipeResult.rows[0].id;

    const insertValues = recipe.ingredient_ids.map((id, index) => `($1, $${index +2})`).join(', ');
    const insertParams = [recipeId, ...recipe.ingredient_ids.map(id => parseInt(id))];
    
    const ingredientSql = `
      INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
      VALUES ${insertValues}
    `;

    await pgClient.query(ingredientSql, insertParams);
    await pgClient.query('COMMIT');
  }
  catch (error) {
    await pgClient.query('ROLLBACK');
    res.status(500).json({ error: `Error: ${error}.` });

    return
  }

  res.location(`/recipes/${recipeId}`);
  res.status(201).json({ message: 'Recipe created successfully.' });
}

const update = async (req, res) => {
  const recipe = req.body;

  try {
    const currentIngredients = await pgClient.query('SELECT ingredient_id FROM recipe_ingredients WHERE recipe_id = $1', [req.params.id]);
    const currentIngredientIds = currentIngredients.rows.map(row => row.ingredient_id);

    const sql = `
      UPDATE recipes SET
        name = $1,
        description = $2,
        category_id = $3,
        author_id = $4
      WHERE
        id = $5
    `;

    const sqlParams = [
      recipe.name,
      recipe.description,
      recipe.category_id,
      recipe.author_id,
      req.params.id
    ];

    await pgClient.query('BEGIN');
    await pgClient.query(sql, sqlParams);

    const removedIngredients = currentIngredientIds.filter(ingredientId => !recipe.ingredient_ids.includes(ingredientId));
    const newIngredients = recipe.ingredient_ids.filter(ingredientId => !currentIngredientIds.includes(ingredientId));

    if (removedIngredients.length > 0) {
      const ingredientSql = `
        DELETE FROM recipe_ingredients
        WHERE
          recipe_id = $1
          AND ingredient_id IN (${removedIngredients.join(',')})
      `;
      await pgClient.query(ingredientSql, [req.params.id]);
    }

    if (newIngredients.length > 0) {
      const ingredientSql = `
        INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
        VALUES
          ${newIngredients.map(ingredientId => `(${req.params.id}, ${ingredientId})`).join(',')}
      `;
      await pgClient.query(ingredientSql);
    }

    await pgClient.query('COMMIT');
  }
  catch (error) {
    await pgClient.query('ROLLBACK');
    res.status(500).json({ error: `Recipes Controller Error: ${error}.` });

    return
  }

  res.status(200).json({ message: 'Recipe updated successfully.' });
}

const destroy = (req, res) => {
  pgClient.query('DELETE FROM recipes WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.status(200).json({ message: 'Recipe successfully deleted.' });
      }
      else {
        res.status(404).json({ error: 'Recipe not found.' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Recipes Controller Error: ${error}` });
    });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};