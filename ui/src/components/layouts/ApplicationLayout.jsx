import {useEffect, useState} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import axios from 'axios';
import AuthModal from '../modals/AuthModal';
import {unauthenticate} from '../slices/authSlice';
import {verifyToken} from '../../actions/authActions';

function ApplicationLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState('');

  useEffect(() => {verifyToken();}, [location.pathname]);

  function handleLoginClick() {
    setAuthAction('login');
    setShowAuthModal(true);
    console.log('Logging in...');
  }

  function handleLogoutClick() {
    axios.post('/api/trainers/logout')
      .then(response => {
        console.log(response.data);
        dispatch(unauthenticate());
      })
      .catch(error => {
        console.error(error);
        dispatch(unauthenticate());
      });

    console.log('Logging out...');
  }

  return ()
}