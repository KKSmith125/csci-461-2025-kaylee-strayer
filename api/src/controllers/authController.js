const pgClient = require('../config/pgClient');
const jwt = require('jsonwebtoken');
const {verifyGoogleToken} = require('../middleware/googleAuth');

async function googleLogin(req, res) {
  const idToken = req.body.credential;

  if (!idToken) {
    return res.redirect('http://localhost:3000?error=notoken');
  }

  try {
    const googleUser = await verifyGoogleToken(idToken);
    const userQuery = await pgClient.query('SELECT id, email, role, client_id, trainer_id FROM user_accounts WHERE email = $1', [googleUser.email]);

    if (userQuery.rowCount === 0) {
      return res.redirect('http://localhost:3000?error=notfound');
    }

    const currentUser = userQuery.rows[0];
    const token = jwt.sign({id: currentUser.id, email: currentUser.email, role: currentUser.role, client_id: currentUser.client_id, trainer_id: currentUser.trainer_id}, process.env.JWT_SECRET, {expiresIn: '2d'});
    res.cookie('jwt', token, {httpOnly: true, sameSite: 'Lax', secure: false});
    res.redirect('http://localhost:3000');
  } catch (err) {
    console.error(err);
    res.redirect('http://localhost:3000?error=google');
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

  pgClient.query('SELECT id, email, password, role, client_id, trainer_id FROM user_accounts WHERE email = $1 AND password = crypt($2, password)', [email, password])
    .then(results => {
      if(results.rowCount > 0) {
        const token = jwt.sign({id: results.rows[0].id, email: results.rows[0].email, role: results.rows[0].role, client_id: results.rows[0].client_id, trainer_id: results.rows[0].trainer_id}, process.env.JWT_SECRET, {expiresIn: '2d'});
        const payload = {
          id: results.rows[0].id,
          role: results.rows[0].role,
          email: results.rows[0].email,
          client_id: results.rows[0].client_id,
          trainer_id: results.rows[0].trainer_id,
          token: token
        };

        res.cookie('jwt', token, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'Lax',
          secure: false
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
  res.json({message: 'Logged out successfully.'});
}

function verifyToken(req, res) {
  const user = res.locals.user;
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      client_id: user.client_id,
      trainer_id: user.trainer_id
    };

    res.json({message: 'Token is valid', user: payload});
  }
  else {
    res.status(401).json({error: 'No one is logged in.'});
  }
}

module.exports = {
  verifyToken,
  googleLogin,
  login,
  logout
};