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

  if (!Number.isInteger(parseInt(weight))) {
    errors.weight = 'must be an integer.'
  }

  if (!Number.isInteger(parseInt(height_ft))) {
    errors.height_ft = 'must be an integer.'
  }

  if (!Number.isInteger(parseInt(height_in))) {
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

  Object.keys(session).forEach(key => {
    if(session[key] === "") {session[key] = null};
  })

  if (!session.session_date) {
    errors.session_date = 'is required.'
  } else if (isNaN(Date.parse(session.session_date))) {
    errors.session_date = 'must be in valid date format.'
  }

  if (!session.trainer_id) {
    errors.trainer_id = 'is required.';
  }

  if (!session.client_id) {
    errors.client_id = 'is required.';
  }

  session.reason_ids = session.reason_ids.filter(id => !isNaN(id));
  
  if (!session.reason_ids || session.reason_ids.length === 0) {
    errors.reason_ids = 'at least one reason is required.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({errors});
  }
  try {
    const conflictQuery = 'SELECT id FROM sessions WHERE trainer_id = $1 AND session_date = $2 AND session_time = $3 AND id = $4';
    const conflictParams = [session.trainer_id, session.session_date, session.session_time, session.id || 0];

    const result = await pgClient.query(conflictQuery, conflictParams);
    
    if (result.rowCount > 0) {
      errors.session_time = 'Another session has already taken that spot! Please choose another time :)';
    }
  }
  catch (error) {
    console.error('Session validation error: ', error);
    return res.status(500).json({error: 'Server error validating session.'});
  }

  if(Object.keys(errors).length > 0) {
    return res.status(422).json({errors});
  }
  else {
    next();
  }
}

module.exports = {
  validateSession,
  validateClient
}