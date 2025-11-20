import {authenticate, unauthenticate} from '../components/slices/authSlice.js';
import store from '../store.js';
import axios from 'axios';

const googleLogin = async (credential) => {
  try {
    const response = await axios.post('/api/auth/google-login', {credential});
    store.dispatch(authenticate(response.data));
    console.log('Google login successful: ', response.data);
  } catch (error) {
    console.error('Google login failed: ', error.response?.data || error.message);
    store.dispatch(unauthenticate());
  }
}

const verifyToken = () => {
  console.log('Verifying token...');

  axios.get('/api/auth/verifyToken')
    .then(response => {
      store.dispatch(authenticate(response.data.user)); 
    })
    .catch(error => {
      console.log('Token verification failed.');
      console.log(error.response.data);

      store.dispatch(unauthenticate());
    });
}

export {googleLogin, verifyToken};