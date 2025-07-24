import {Alert} from 'react-bootstrap';

const Unauthenticated = () => {
  return (
    <>
      <Alert variant='danger'> You need to log in as a trainer to access this content!</Alert>
      <div>You need to log in as a trainer to access this content, sorry!</div>
    </>
  );
}

export default Unauthenticated;