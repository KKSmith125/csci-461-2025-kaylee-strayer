const jwt = require('jsonwebtoken');
const pgClient = require('../config/pgClient');

async function authenticate(req, res, next) {
  try {
  const token = req.cookies?.jwt || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({error: 'No one is logged in.'});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
  const query = await pgClient.query('SELECT id, email, role FROM user_accounts WHERE id = $1', [decoded.id])
  
  if (query.rowCount === 0) {
    return res.status(404).json({error: 'That user hasn\'t been registered yet.'});
  }
  
  res.locals.user = query.rows[0];
  next();
  } catch(error) {
    return res.status(401).json({error: 'No valid token.'});
  }
}

module.exports = {authenticate};