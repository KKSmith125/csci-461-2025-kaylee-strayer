import {authenticate, unauthenticate} from '../components/slices/authSlice.js';
import store from '../store.js';
import axios from 'axios';

const verifyToken = () => {
  console.log('Verifying token...');

  axios.get('/api/trainers/verifyToken')
    .then(response => {
      store.dispatch(authenticate(response.data.user)); 
    })
    .catch(error => {
      console.log('Token verification failed.');
      console.log(error.response.data);

      store.dispatch(unauthenticate());
    });
}

export {verifyToken};