import {useEffect, useState} from 'react';
import {Container, Form, Row, Col, Button, Spinner, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';

const SessionForm = ({session}) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({message: '', variant: ''});
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [trainers, setTrainers] = useState('');
  const [reasons, setReasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trainer = useSelector(state => state.auth.trainer);
  const [formData, setFormData] = useState({
    session_date: '',
    session_time: '',
    trainer_id: '',
    client_id: '',
    reason_ids: []
  });

  useEffect(() => {
    if (!!session?.id) {
      setFormData({
        session_date: session.session_date || '',
        session_time: session.session_time || '',
        trainer_id: session.trainer_id || '',
        client_id: session.client_id || '',
        reason_ids: session.reasons.map(i => i.id) || []
      });
    }
  }, [session, trainer]);

  useEffect(() => {
    if (trainer?.id) {
      setFormData(prev => ({...prev, trainer_id: trainer.id}));
    }
  }, [session, trainer]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      axios.get('/api/trainers'),
      axios.get('/api/clients'),
      axios.get('/api/reasons')
    ])
      .then(([trainersResponse, clientsResponse, reasonsResponse]) => {
        setTrainers(trainersResponse.data);
        setClients(clientsResponse.data);
        setReasons(reasonsResponse.data);
      })
      .catch(error => {
        setAlert({message: 'Failed to load data', variant: 'danger'});
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const handleInputChange = (e, key) => {
    setErrors({...errors, [key]: ''});
    setFormData({...formData, [key]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});

    console.log('Submitting formData:', formData);

    if (!session?.id && trainer?.id) {
      formData.trainer_id = trainer.id;
    }
    const apiCall = !!session?.id ? axios.put(`/api/sessions/${session.id}`, formData) : axios.post('/api/sessions', formData);

    apiCall
      .then(response => {
        navigate('/sessions', {state: {alert: {message: `Session successfully ${!!session?.id ? 'updated' : 'created'}.`, variant: 'success'}}});
      })
      .catch(error => {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
        }
        else {
          setAlert({message: `Failed to ${!!session?.id ? 'update' : 'create'} session.`, variant: 'danger'});
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      {!!alert.message &&
        <Alert className='text-center' variant={alert.variant} onClose={() => setAlert({message: '', variant: ''})} dismissible>{alert.message}</Alert>
      }

      {isLoading && <center><Spinner animation='border'></Spinner></center>}

      <Row>
        <Container as={Col} xs={7} className='bg-light text-black rounded p-2'>
          <Form className='p-2'>
            <Row>
              <Form.Group className='pb-2'>
                <Form.Label>Session Date</Form.Label>
                <Form.Control type='date' value={formData.session_date} isInvalid={!!errors.session_date} onChange={(e) => handleInputChange(e, 'session_date')}></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.session_date}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-2'>
                <Form.Label>Session Time</Form.Label>
                <Form.Control type='time' value={formData.session_time} isInvalid={!!errors.session_time} onChange={(e) => handleInputChange(e, 'session_time')}></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.session_time}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg={6} className='pb-2'>
               <Form.Label>Client</Form.Label>
                <Form.Select type='text' value={formData.client_id} isInvalid={!!errors.client_id} onChange={(e) => handleInputChange(e, 'client_id')}>
                  <option value=''>Select Client</option>
                  {clients.map(client => <option value={client.id} key={client.name}>{client.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.client_id}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} lg={6} className='pb-2'>
                <Form.Label>Trainer</Form.Label>
                <Form.Select type='text' value={formData.trainer_id} isInvalid={!!errors.trainer_id} onChange={(e) => handleInputChange(e, 'trainer_id')}>
                  <option value=''>Select Trainer</option>
                  {trainers.map(trainer => <option value={trainer.id} key={trainer.name}>{trainer.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.trainer_id}</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group as={Col} lg={6} className='pb-2'>
                <Form.Label>Reasons</Form.Label>
                <Form.Control as='select' multiple value={formData.reason_ids} isInvalid={!!errors.reason_ids} onChange={(e) => {setErrors({...errors, reason_ids: ''}); setFormData({...formData, reason_ids: Array.from(e.target.selectedOptions, option => parseInt(option.value))});}} style={{height: '300px'}}>
                  {reasons.map(reason => <option value={reason.id} key={reason.id}>{reason.name}</option>)}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.reason_ids}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-4'>
                <Button variant='primary' type='submit' disabled={isSubmitting} className='me-2 btn-action' onClick={handleSubmit} style={{minWidth: '80px'}}>
                  {isSubmitting ? <Spinner size='sm'/> : 'Save'}
                </Button>

                <Button variant='secondary' type='button' style={{minWidth: '80px'}} onClick={() => navigate('/sessions')}>
                  Cancel
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Row>
    </>
  );
}

export default SessionForm;