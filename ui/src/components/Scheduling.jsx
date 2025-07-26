//Includes session scheduling form and session options/other information
import {Col, Row, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Scheduling () {
  return (
    <Container className='justify-content-center'>
      <Link to='/sessions/new'>
        <Button variant='success' size='lg'>Schedule a Session!</Button>
      </Link>
      
      <h1 class='display-4'>Session Information</h1>
      <h5>General</h5>
      <p>
        When scheduling a first-time consult session (which is free) using our form above,
        the client will be asked to provide standard information about themselves such as height, weight,
        and age so that the selected trainer will be able to have some information to go off of
        when doing research and work prior to the consult. From this consult the client will be able to 
        choose what training schedule will suit them. Some of the available options are described below.  
      </p>

      <h5>Packages & Customizability</h5>
      <p>
        Each option below is open to customization and specific cost analysis during discussions with the 
        training staff. This customization may include additions or subtractions of virtual sessions, virtual 
        training and sport-specific work.
      </p>

      <h6>Solo Journey</h6>
      <p>
        This includes specially-tailored nutrition and workout plans. These plans will be sent virtually
        and the client will have the freedom to use them however they please. Virtual consults with the trainer 
        will be available weekly.
      </p>
      <p className='fw-bold'>
        Cost:
      </p>
      <p>
        $100 per week
      </p>

      <h6>50/50 Package</h6>
      <p>
        This is an all inclusive package that pays for any nutrition and workout programming
        the trainer will do outside of direct client interaction and includes the ability to 
        schedule up to 3 sessions a week including 1 cardio and weightlifting session a day.
      </p>  
      <p className='fw-bold'>
        Cost:
      </p>
      <p>
        $300 per week
      </p>

      <h6>Full Package</h6>
      <p>
        This is an all inclusive package that pays for any nutrition and workout programming
        the trainer will do outside of direct client interaction and includes the ability to 
        schedule up to 5 sessions a week including 1 cardio and weightlifting session a day.
      </p>  
      <p className='fw-bold'>
        Cost:
      </p>
      <p>
        $500 per week
      </p>

      <h5 className='fw-bold'>Disclaimer</h5>
      <p>
        We aim to be affordable while also supplying our trainers with what they need. If you 
        find a more competitive rate please let us know!
      </p>
    </Container>
  );
}

export default Scheduling;