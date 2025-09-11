//Includes session scheduling form and session options/other information
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Scheduling () {
  return (
    <>
      <div className='text-center'>
        <Link to='/sessions/new'>
          <Button className='m-2' variant='success' size='lg'>Schedule a Session!</Button>
        </Link>
        <Link to='/clients/new'>
          <Button className='m-2' variant='success' size='lg'>Sign Up As A Client!</Button>
        </Link>
      </div>
      
      <h1 className='display-6 text-center pt-4 pb-2'>Session Information</h1>
      <h5>General</h5>
      <p>
        When scheduling a first-time consult session (which is free) using our forms above,
        the client will be asked to provide standard information about themselves such as height, weight,
        and age so that the selected trainer will be able to have some information to go off of
        when doing research and work prior to the consult. Once this information has been provided, the new client
        will now be able to schedule their consult! From this consult the client will be able to 
        choose what training schedule will suit them. Some of the available options are described below.  
      </p>

      <h5 className='pt-4 pb-2'>Packages & Customizability</h5>
      <p>
        Each option below is open to customization and specific cost analysis during discussions with the 
        training staff. This customization may include additions or subtractions of virtual sessions, virtual 
        training and sport-specific work.
      </p>

      <h6 className='fw-bold pt-4 pb-2'>Solo Journey</h6>
      <p>
        This includes specially-tailored nutrition and workout plans. These plans will be sent virtually
        and the client will have the freedom to use them however they please. Virtual consults with the trainer 
        will be available weekly.
      </p>
      <p>
        Cost: $100 per week
      </p>
    
      <h6 className='fw-bold pt-4 pb-2'>50/50 Package</h6>
      <p>
        This is an all inclusive package that pays for any nutrition and workout programming
        the trainer will do outside of direct client interaction and includes the ability to 
        schedule up to 3 sessions a week including 1 cardio and weightlifting session a day.
      </p>  
      <p>
        Cost: $300 per week
      </p>

      <h6 className='fw-bold pt-4 pb-2'>Full Package</h6>
      <p>
        This is an all inclusive package that pays for any nutrition and workout programming
        the trainer will do outside of direct client interaction and includes the ability to 
        schedule up to 5 sessions a week including 1 cardio and weightlifting session a day.
      </p>  
      <p>
        Cost: $500 per week
      </p>

      <h5 className='fw-bold pt-4'>Disclaimer</h5>
      <p>
        We aim to be affordable while also supplying our trainers with what they need. If you 
        find a more competitive rate please let us know!
      </p>
    </>
  );
}

export default Scheduling;