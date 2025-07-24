import {Container} from 'react-bootstrap';

function NotFound() {
  return (
    <Container className='pt-3'>
      <h3>Oops!</h3>
      <p>It look like the page you are searching for couldn't be found, we're sorry!</p>
    </Container>
  );
}

export default NotFound;