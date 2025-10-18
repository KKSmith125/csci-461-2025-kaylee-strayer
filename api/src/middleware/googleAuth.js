const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID});
    const payload = ticket.getPayload();

    return {
      email: payload.email,
      name: payload.name,
      googleId: payload.sub
    };
  } catch (error) {
    throw new Error('Invalid Google token');
  }
}

module.exports = {verifyGoogleToken};