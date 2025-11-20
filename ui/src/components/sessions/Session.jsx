import {Container, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const Session = ({session}) => {
  const user = useSelector(state => state.auth.user);
  const isTrainer = user?.role === 'TRAINER';
  const isClient = user?.role == 'CLIENT';
  const trainerId = isTrainer ? user?.id : null;
  const clientId = isClient ? user?.id : null;

  function formatTime(militaryTime) {
    const [hours, minutes] = militaryTime.split(':');
    let hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    hourNum = hourNum % 12 || 12;
    return `${hourNum}:${minutes} ${ampm}`;
  }

  const reasonList = () => {
    return session.reasons.map((reason) => reason.name).join(', ');
  }

  if (trainerId !== session.trainer?.id && clientId !== session.client?.id) return null;
  
  return (
    <Container className='text-white text-center my-4 py-4 rounded-4' fluid>
      <h2 className='display-6 pb-3'>Session Details</h2>

      <Row className='mb-2'>
        <Col xs={4}>Session on: {new Date(session.session_date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</Col>
        <Col xs={4}>At: {formatTime(session.session_time)}</Col>
      </Row>

      <Row className='mb-2'>
        <Col xs={4}>With: {session.client?.name}</Col>
      </Row>

      <Row className='mb-2'>
        <Col xs={4}>Reasons:</Col>
        <Col xs={8}>{reasonList()}</Col>
      </Row>
    </Container>
  )
}

export default Session;