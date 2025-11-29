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
  const loggedInUser = useSelector(state => state.auth.user);
  const isTrainer = loggedInUser?.role === 'TRAINER';
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('/api/auth/verifyToken', {withCredentials: true});
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
    axios.post('/api/auth/logout', {}, {withCredentials: true})
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
    <Container fluid className='min-vh-100 d-flex flex-column px-0'>
      {/* Header */}
      <header className='site-header text-center text-white d-flex align-items-center justify-content-center'>
        <div>
          <h1 className='fw-bold'>Strayer Fitness</h1>
          <p className='lead mb-0'>Reimagining Health & Wellness</p>
        </div>
      </header>

      {/* Navigation */}
        <Navbar expand='lg' bg='dark' variant='dark' className='shadow-sm py-2 px-3'>
          <Navbar.Brand as={NavLink} to='/' className='fw-bold text-uppercase'>
            SF
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='main-nav'/>
          <Navbar.Collapse id='main-nav' className='justify-content-between'>
          <Nav>
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            <Nav.Link as={NavLink} to='/Scheduling'>Scheduling</Nav.Link>
            <Nav.Link as={NavLink} to='/Nutrition'>General Nutrition</Nav.Link>
            <Nav.Link as={NavLink} to='/Weightlifting'>General Weightlifting</Nav.Link>
            <Nav.Link as={NavLink} to='/Cardio'>General Cardio</Nav.Link>
            <Nav.Link as={NavLink} to='/TrainerTrove'>Trainers</Nav.Link>
            {auth?.isAuthenticated && isTrainer ? <Nav.Link as={NavLink} to='/Sessions'>Sessions</Nav.Link> : <></>}
          </Nav>

          <Nav className='justify-content-end'>
            {auth?.isAuthenticated ?
              <Nav.Link onClick={handleLogoutClick}>Log Out</Nav.Link>
              :
              <Nav.Link onClick={handleLoginClick}>Log In</Nav.Link>
            }
          </Nav>
          </Navbar.Collapse>
        </Navbar>

      <main className='px-3 py-4 flex-grow-1' style={{background: 'linear-gradient(90deg, #2b2b2b, #3f3f3f)'}}>
        <Outlet />
      </main>

      <AuthModal
        show={showAuthModal}
        setShow={setShowAuthModal}
        authAction={authAction}
        setAuthAction={setAuthAction}
      />
    </Container>
  );
}

export default ApplicationLayout;