const pgClient = require('../config/pgClient');

const validateClient = async (req, res, next) => {
  const client = req.body;
  client.id = req.params.id;
  const errors = {};
  const {weight, height_ft, height_in} = client;

  if (!client.name || client.name.length === 0) {
    errors.name = 'is required.';
  }

  if (client.name.length > 100) {
    errors.name = 'cannot be more than 100 characters.';
  }

  let query;
  if (!!client.id) {
    query = pgClient.query('SELECT id FROM clients WHERE name = $1 AND id != $2', [client.name, client.id]);
  }
  else {
    query = pgClient.query('SELECT id FROM clients WHERE name = $1', [client.name]);
  }

  const clientExists = (await query).rowCount > 0;
  if (clientExists) {
    errors.name = 'already taken.';
  }

  if (!Number.isInteger(weight)) {
    errors.weight = 'must be an integer.'
  }

  if (!Number.isInteger(height_ft)) {
    errors.height_ft = 'must be an integer.'
  }

  if (!Number.isInteger(height_in)) {
    errors.height_in = 'must be an integer.'
  }

  if(Object.keys(errors).length > 0) {
    res.status(422).json({errors});
  }
  else {
    next();
  }
}

const validateSession = async (req, res, next) => {
  const session = req.body;
  session.id = req.params.id;
  const errors = {};

  if (!session.session_date) {
    errors.session_date = 'is required.'
  }

  if (isNaN(Date.parse(session.session_date))) {
    errors.session_date = 'must be in valid date format.'
  }

  if (!session.trainer_id || session.trainer_id.length === 0) {
    errors.trainer_id = 'is required.';
  }

  if (!session.client_id || session.client_id.length === 0) {
    errors.client_id = 'is required.';
  }

  session.reason_ids = session.reason_ids.filter(id => !isNaN(id));
  if (!session.reason_ids || session.reason_ids === 0) {
    errors.reason_ids = 'at least one reason is required.'
  }

  if(Object.keys(errors).length > 0) {
    res.status(422).json({errors});
  }
  else {
    next();
  }
}

module.exports = {
  validateTrainer,
  validateSession,
  validateClient
}