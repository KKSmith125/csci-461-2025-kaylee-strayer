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

  return (
    <div id='background' className='min-vh-100'>
      <Container id='container' className='min-vh-100 d-flex flex-column'>
        <div id='header'>
          <div className='py-5 px-3 bg-light'>
            <h1>Strayer Fitness: Reimagining Health & Wellness</h1>
          </div>
          <Navbar className='justify-content-between bg-secondary'>
            <Nav className='bg-secondary'>
              <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/Scheduling'>Scheduling</Nav.Link>
              <Nav.Link as={NavLink} to='/Nutrition'>General Nutrition</Nav.Link>
              <Nav.Link as={NavLink} to='/Weightlifting'>General Weightlifting</Nav.Link>
              <Nav.Link as={NavLink} to='/Cardio'>General Cardio</Nav.Link>
              <Nav.Link as={NavLink} to='/About'>About Us</Nav.Link>
              {auth?.isAuthenticated ? <Nav.Link as={NavLink} to='/Sessions'>Sessions</Nav.Link> : <></>}
            </Nav>
            <Nav className='bg-secondary justify-content-end'>
              {auth?.isAuthenticated ?
                <Nav.Link onClick={handleLogoutClick}>Log Out</Nav.Link>
                :
                <Nav.Link onClick={handleLoginClick}>Log In</Nav.Link>
              }
            </Nav>
          </Navbar>
        </div>

        <div id='body' className='px-2 py-3 mt-0 bg-light flex-grow-1'>
          <Outlet />
        </div>

        <AuthModal show={showAuthModal} action={authAction} setShow={setShowAuthModal}/>
      </Container>
    </div>
  );
}

export default ApplicationLayout;