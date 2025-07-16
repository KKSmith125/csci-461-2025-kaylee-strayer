const pgClient = require('../config/pgClient');

const index = (req, res) => {
  pgClient.query('SELECT id, name, weight, height_ft, height_in FROM clients ORDER BY name ASC')
    .then(results => {
      res.status(200).json(results.rows);
    })
    .catch((error) => {
      res.status(500).json({error: `Error: ${error}.`});
    });
}

const show = (req, res) => {
  pgClient.query('SELECT id, name, weight, height_ft, height_in FROM clients WHERE id = $1', [req.params.id])
    .then((results) => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({error: `Client not found for id ${req.params.id}.`});
      }
    })
    .catch((error) => {
      res.status(500).json({error: `Error: ${error}`});
    });
}

const create = (req, res) => {
  const client = req.body;

  pgClient.query('INSERT INTO clients (name, weight, height_ft, height_in) VALUES ($1, $2, $3, $4) RETURNING id', [client.name, client.weight, client.height_ft, client.height_in])
    .then(results => {
      res.location(`/clients/${results.rows[0].id}`);
      res.status(201).json({message: 'Client successfully created!'});
    })
    .catch((error) => {
      res.status(500).json({error: `Error: ${error}.`});
    });
}

const update = (req, res) => {
  const client = req.body;

  pgClient.query('UPDATE clients SET name = $1, weight = $2, height_ft = $3, height_in = $4 WHERE id = $5', [client.name, client.weight, client.height_ft, client.height_in, req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.status(200).json({message: 'Client successfully updated!'});
      }
      else {
        res.status(404).json({error: `Client not found :(`});
      }
    })
    .catch((error) => {
      res.status(500).json({error: `Error: ${error}`});
    });
}

const destroy = (req, res) => {
  pgClient.query('DELETE FROM clients WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.status(200).json({message: 'Client successfully deleted!'});
      }
      else {
        res.status(404).json({error: 'Client not found :('});
      }
    })
    .catch((error) => {
      res.status(500).json({error: `Error: ${error}`});
    })
}
module.exports = {index, show, create, update, destroy};