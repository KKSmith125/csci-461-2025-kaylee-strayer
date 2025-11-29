import {useLocation, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Container, Spinner, Alert, Modal, Button} from 'react-bootstrap';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useSelector} from 'react-redux';

const localizer = momentLocalizer(moment);

const Sessions = () => {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const {user} = useSelector(state => state.auth);
  const trainerId = user?.role === 'TRAINER' ? user.id : null;

  useEffect(() => {
    axios.get('/api/sessions')
      .then(response => {
        const trainerSessions = response.data.filter(session => session.trainer?.id === trainerId);
        setSessions(trainerSessions);

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
  }, [location.state, trainerId]);

  const reasonList = (session) => session.reasons.map((reason) => reason.name).join(', ');

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  }

  const getStartEndDates = (session) => {
    const [hours, minutes, seconds] = session.session_time.split(':').map(Number);

    const start = moment(session.session_date, 'YYYY-MM-DD')
      .set({hour: hours, minute: minutes, second: seconds || 0})
      .toDate();

    const end = moment(start).add(1, 'hour').toDate();

    return {start, end};
  }

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

  const events = sessions.map(session => {
    const {start, end} = getStartEndDates(session);
    return {
      id: session.id,
      title: `Client: ${session.client.name}`,
      start,
      end,
      reason: reasonList(session)
    }
  })

  return (
    <Container className='text-white text-center py-4' fluid>
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.variant} dismissible className='mx-auto w-75'>{alert.message}</Alert>
      ))}

      <h3 className='display-4 pe-3 pb-3 text-center'>Sessions Calendar</h3>

      {isLoading ? 
      <div className='d-flex justify-content-center align-items-center' style={{height: '400px'}}><Spinner animation='border'></Spinner></div>
      : 
      <>
        {sessions.length === 0 ?
          <p>No sessions found.</p>
          :
          <Container className='bg-dark rounded-4 p-3 mt-3' style={{height: 700}}>
            <Calendar 
              localizer={localizer}
              events={events}
              startAccessor='start'
              endAccessor='end'
              style={{height: '100%', borderRadius: '12px'}}
              eventPropGetter={(event) => {
                let backgroundColor = '#444';
                let textColor = '#fff';

                return {
                  style: {
                    backgroundColor,
                    color: textColor,
                    borderRadius: '6px',
                    border: '1px solid #666'
                  },
                };
              }}
              onSelectEvent={handleEventClick}
              view={view}
              date={date}
              onView={(newView) => setView(newView)}
              onNavigate={(newDate) => setDate(newDate)}
            />
          </Container>
        }
      </>}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName='bg-dark text-white rounded-4 border border-secondary'>
        <Modal.Header closeButton closeVariant='white' className='border-secondary'>
          <Modal.Title className='fw-bold'>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-secondary bg-opacity-25'>
          <p><strong>Reason:</strong> {selectedEvent?.reason}</p>
          <p><strong>Date:</strong> {moment(selectedEvent?.start).format('MMMM D, YYYY')}</p>
        </Modal.Body>
        <Modal.Footer className='border-secondary'>
          <Button as={Link} to={`/sessions/${selectedEvent?.id}/edit`} variant='secondary' className='me-2'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-pen' viewBox='0 0 16 16'>
              <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z' />
            </svg>
          </Button>
          <Button variant='danger' onClick={(e) => deleteSession(e, selectedEvent)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-trash' viewBox='0 0 16 16'>
              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
              <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
            </svg>
          </Button> 
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Sessions;