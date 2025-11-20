import {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {authenticate, unauthenticate} from '../slices/authSlice';
import axios from 'axios';

function AuthModal({show, setShow, authAction, setAuthAction}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      const parent = document.getElementById('google-signin');
      if (parent && window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin'),
          {theme: 'outline', size: 'large', width: '225'}
        );

        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [show]);

  function handleGoogleCallback(response) {
    axios.post('/api/auth/google-login', {credential: response.credential}, {withCredentials: true})
      .then(res => {
        dispatch(authenticate(res.data.user));
        resetForm();
        setShow(false);
      })
      .catch(err => {
        console.error(err);
        dispatch(unauthenticate());
      })
  }

  function handleSubmit (e) {
    e.preventDefault();
    setIsLoading(true);

    axios.post('/api/auth/login', formData,{withCredentials: true})
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

  function handleHide (e) {
    resetForm();
    setShow(false);
    setAuthAction('');
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
        </div>

        {authAction === 'login' && <div id='google-signin' className='mt-3'></div>}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;