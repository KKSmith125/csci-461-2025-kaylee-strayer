import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Container, Row, Spinner, Alert} from 'react-bootstrap';
import axios from 'axios';

import Session from './Session';

const Sessions = () => {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/sessions')
      .then(response => {
        setSessions(response.data);
        setAlerts([]);

        if (location.state?.alert) {
          setAlerts(prevAlerts => [...prevAlerts, location.state.alert]);
          window.history.replaceState({}, '');
        }
      })
      .catch(error => {
        setAlerts([...alerts, {message: 'Failed to load sessions :(', variant: 'danger'}]);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [location.state]);

  const deleteSession = (e, session) => {
    e.preventDefault();
    const sessionId = session.id;

    if (window.confirm(`Are you sure you want to delete this session, on ${session.session_date} at ${session.session_time}?`)) {
      axios.delete(`/api/sessions/${sessionId}`)
        .then(response => {
          setSessions(prev => prev.filter(session => session.id !== sessionId));
          setAlerts([...alerts, {message: 'Session successfully deleted!', variant: 'success'}]);
        })
        .catch(error => {
          setAlerts([...alerts, {message: 'Failed to delete session :(', variant: 'danger'}]);
        });
    }
  }

  return (
    <Container className='pt-3'>
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.variant} dismissible>{alert.message}</Alert>
      ))}

      <h3 className='pe-3 pb-3 text-center'>Sessions</h3>

      {isLoading ? 
      <div className='d-flex justify-content-center'><Spinner animation='border'></Spinner></div>
      : 
      <>
        {sessions.length === 0 ?
          <p>No sessions found.</p>
          :
          <Row>
            {sessions.map(session => (<Session key={session.id} session={session} onDeleteClick={deleteSession}/>
          ))}
          </Row>
        }
      </>}
    </Container>
  );
}

export default Sessions;