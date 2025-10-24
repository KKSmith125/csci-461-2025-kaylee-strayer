import {useEffect, useState} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import axios from 'axios';
import AuthModal from '../modals/AuthModal';
import {unauthenticate, authenticate} from '../slices/authSlice';

function ApplicationLayout({}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [authAction, setAuthAction] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('/api/trainers/verifyToken', {withCredentials: true});
        dispatch(authenticate(res.data.user));
      } catch (error) {
        dispatch(unauthenticate());
      }
    };

    verifyUser();
  }, [dispatch, location.pathname]);
  
  function handleLoginClick() {
    setAuthAction('login');
    setShowAuthModal(true);
    console.log('Logging in...');
  }

  function handleLogoutClick() {
    setAuthAction('logout');
    axios.post('/api/trainers/logout', {}, {withCredentials: true})
      .then(response => {
        console.log(response.data);
        dispatch(unauthenticate());
        setAuthAction('');
      })
      .catch(error => {
        console.error(error);
        dispatch(unauthenticate());
        setAuthAction('');
      });

    console.log('Logging out...');
  }

  return (
    <Container fluid id='container' className='min-vh-100 d-flex flex-column px-0'>
      <div id='header'>
        <div className='py-5 px-3 bg-light text-center' style={{height: '150px'}}>
          <h1>Strayer Fitness: Reimagining Health & Wellness</h1>
        </div>
        <Navbar className='justify-content-between bg-secondary'>
          <Nav className='bg-secondary'>
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            <Nav.Link as={NavLink} to='/Scheduling'>Scheduling</Nav.Link>
            <Nav.Link as={NavLink} to='/Nutrition'>General Nutrition</Nav.Link>
            <Nav.Link as={NavLink} to='/Weightlifting'>General Weightlifting</Nav.Link>
            <Nav.Link as={NavLink} to='/Cardio'>General Cardio</Nav.Link>
            <Nav.Link as={NavLink} to='/TrainerTrove'>Trainers</Nav.Link>
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

      <AuthModal show={showAuthModal} setShow={setShowAuthModal} authAction={authAction} setAuthAction={setAuthAction}/>
    </Container>
  );
}

export default ApplicationLayout;