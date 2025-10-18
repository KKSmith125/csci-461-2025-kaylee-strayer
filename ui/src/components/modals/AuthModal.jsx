import {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {authenticate, unauthenticate} from '../slices/authSlice';
import axios from 'axios';

function AuthModal({show, setShow}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkGoogle = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback
        });

      clearInterval(checkGoogle);
    }
  }, 300);

    return () => clearInterval(checkGoogle);
  }, []);

  function handleSubmit (e) {
    e.preventDefault();
    
    setIsLoading(true);

    axios.post('/api/trainers/login', formData)
      .then(response => {
        dispatch(authenticate(response.data));
        resetForm();
        handleHide();
      })
      .catch(error => {
        dispatch(unauthenticate());

        const status = error.response?.status;
        if (status === 422) {
          setErrors(error.response.data.errors);
        }
        else if (status === 401) {
          setErrors({email: 'invalid email or password.'});
        }
        else if (status === 404) {
          setErrors({email: 'user not found.'});
        }
        else {
          setErrors({email: 'an error occured :( Please try again later!'});
        }
      })
      .finally(() => setIsLoading(false));
  }

  function handleGoogleLogin() {
    if (window.google && window.google.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Identity script not ready yet.');
    }
  }

  async function handleGoogleCallback(response) {
    try {
          const idToken = response.credential;
          const res = await axios.post('/api/trainers/google-login', {idToken});
          dispatch(authenticate(res.data));
          resetForm();
          handleHide();
    } catch (error) {
      console.error('Google login failed: ', error.response?.data || error.message);
      dispatch(unauthenticate());
    }
  }

  function handleHide (e) {
    resetForm();
    setShow(false);
  }

  function resetForm() {
    setErrors({});
    setFormData({email: '', password: ''});
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={formData.email} isInvalid={!!errors.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
          <Form.Label className='mt-3'>Password</Form.Label>
          <Form.Control type='password' value={formData.password} isInvalid={!!errors.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
        
        <div className='mt-3 text-end'>
          <Button type='submit' disabled={isLoading} className='me-2'>{isLoading ? 'Logging in...' : 'Log In'}</Button>
          <Button variant='secondary' className='me-2' onClick={handleHide}>Cancel</Button>
          <Button variant='danger' onClick={handleGoogleLogin}>Google Sign In</Button>
        </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;