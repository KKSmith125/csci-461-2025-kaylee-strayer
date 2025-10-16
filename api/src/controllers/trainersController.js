const pgClient = require('../config/pgClient');
const jwt = require('jsonwebtoken');
const {verifyGoogleToken} = require('../middleware/googleAuth');

async function googleLogin(req, res) {
  const {idToken} = req.body;
  if (!idToken) {
    return res.status(422).json({error: 'ID token is required'});
  }

  try {
    const googleUser = await verifyGoogleToken(idToken);
    const results = await pgClient.query('SELECT id, name, description, email FROM trainers WHERE email = $1', [googleUser.email])
    let user;

    if (results.rowCount > 0) {
      user = results.rows[0];
      const token = generateToken({id: user.id});
      res.cookie('jwt', token, {maxAge:1000000, httpOnly: true});
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token
      });
    }
  } catch (err) {
    res.status(401).json({error: 'User not found'});
  }
}

function login(req, res) {
  const {email, password} = req.body;
  const errors = {};

  if (!email || email.length === 0) {
    errors.email = 'Email is required';
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).json({errors});
    return;
  }

  pgClient.query('SELECT id, name, description, email, password FROM trainers WHERE email = $1 AND password = crypt($2, password)', [email, password])
    .then(results => {
      if(results.rowCount > 0) {
        const token = generateToken({id: results.rows[0].id});
        const payload = {
          id: results.rows[0].id,
          name: results.rows[0].name,
          description: results.rows[0].description,
          email: results.rows[0].email,
          token: token
        };

        res.cookie('jwt', token, {
          maxAge: 1000000,
          httpOnly: true
        });

        res.json(payload);
      }
      else {
        res.status(401).json({error: 'Invalid email or password.'});
      }
    })
    .catch(error => {
      res.status(500).json({error: `${error}`});
    });
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.json({message: 'Loggied out successfully.'});
}

function generateToken(attributes) {
  return jwt.sign(attributes, process.env.JWT_SECRET, {expiresIn: '2 days'});
}

function verifyToken(req, res) {
  if (res.locals.user !== undefined) {
    res.json({message: 'Token is valid', user: res.locals.user});
  }
  else {
    res.status(401).json({error: 'No one is logged in.'});
  }
}
const index = (req, res) => {
  pgClient.query('SELECT id, name, description, email, password FROM trainers ORDER BY name ASC')
    .then(results => {
      res.status(200).json(results.rows);
    })
    .catch((error) => {
      res.status(500).json({ error: `Error: ${error}.` });
    });
}

module.exports = {
  verifyToken,
  index,
  googleLogin,
  login,
  logout
};