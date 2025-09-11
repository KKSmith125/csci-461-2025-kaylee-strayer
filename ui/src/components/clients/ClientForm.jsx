import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import {Alert, Row, Col, Container, Form, Button} from 'react-bootstrap';
import axios from 'axios';

const ClientForm = ({client}) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({message: '', variant: ''});
  const [errors, setErrors] = useState({name: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({name: client ? client.name : '', weight: client ? client.weight : 0, height_ft: client ? client.height_ft : 0, height_in: client ? client.height_in : 0});

  const handleChange = (e, key) => {
    setErrors({...errors, [key]: ''});
    setFormData({...formData, [key]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    const apiCall = !!client?.id ? axios.put(`/api/clients/${client.id}`, formData) : axios.post('/api/clients', formData);
  
    apiCall
      .then(response => {
        navigate('/Scheduling', {state: {alert: {message: 'Client saved successfully!', variant: 'success'}}});
      })
      .catch ((error) => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
        else {
          setAlert({message: 'Error saving client :(', variant: 'danger'});
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      {!!alert.message &&
        <Alert className = 'text-center' variant={alert.variant} onClose={() => setAlert({message: '', variant: ''})} dismissible>{alert.message}</Alert>
      }

      <Row>
        <Container as={Col} xs={7} className='bg-light text-back rounded p-2'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={formData.name} onChange={(e) => handleChange(e, 'name')} isInvalid={!!errors.name}/>
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <Form.Control type='number' placeholder='Enter weight' value={formData.weight} onChange={(e) => handleChange(e, 'weight')} isInvalid={!!errors.weight}/>
              <Form.Control.Feedback type='invalid'>{errors.weight}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Height (ft)</Form.Label>
              <Form.Control type='number' placeholder='Enter height (ft)' value={formData.height_ft} onChange={(e) => handleChange(e, 'height_ft')} isInvalid={!!errors.height_ft}/>
              <Form.Control.Feedback type='invalid'>{errors.height_ft}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Height (in)</Form.Label>
              <Form.Control type='number' placeholder='Enter height (in)' value={formData.height_in} onChange={(e) => handleChange(e, 'height_in')} isInvalid={!!errors.height_in}/>
              <Form.Control.Feedback type='invalid'>{errors.height_in}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='pt-3 pb-2'>
              <Button variant='primary' type='submit' className='me-2 btn-action' disabled={isSubmitting}>Save</Button>
              <Button variant='secondary' type='button' as={Link} to='/Scheduling'>Cancel</Button>
            </Form.Group>
          </Form>
        </Container>
      </Row>
    </>
  );
}

export default ClientForm;