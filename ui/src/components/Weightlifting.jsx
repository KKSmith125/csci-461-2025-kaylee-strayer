import {Container, Image, Row, Col} from 'react-bootstrap';

import '../App.css';

function Weightlifting() {
 return (
  <>
      <h1 className='display-4 text-center pb-2'>Weightlifting</h1>

      <Container className='d-flex justify-content-center align-items-center p-0 m-0' fluid>
        <Row className='g-0'>
          <Col>
            <Image src='https://gymvmt.com/wp-content/uploads/2023/04/no_promises.jpg' className='uniform-height' fluid/>
          </Col>
          <Col>
            <Image src='https://cdn.shedefined.com.au/wp-content/uploads/2024/05/22135726/Are-you-exercising-safely-as-a-woman-Heres-what-to-ask-your-personal-trainer-960x540-1.jpg' className='uniform-height' fluid/>
          </Col>
        </Row>
      </Container>

      <Container className='justify-content-center'>
        <h1 className='display-6 pt-4 pb-2'>Overview</h1>
        <p>
          When it comes to the world of fitness, weightlifting is a big part of most if not all routines. Whether a client's focus is to build as 
          much muscle mass as possible or they want to run a better half-marathon, weightlifting is essential. In terms of how often one should weightlift 
          or what exercises to do, that all depends on a client's goal. For instance, if the goal is to build a large amount of muscle, then more weightlifting 
          will be programmed than if a client is aiming to run a better half-marathon as a lot of the weightling for that half-marathon training will be meant for 
          speed as well as longevity and will be different than the other style of training.
        </p>

        <h1 className='display-6 pt-4 pb-2'>Some General Exercises</h1>
        <p>
          As outline, a lot of exerise selection has to do with what is aiming to be achieved. That being said, we have provided a sample option for a day of lifting by
          muscle group! In addition to these exercises, it is important to institute stretches and strengthening exercises that target possible problem areas 
          such as the ankle or the knee. This is better specifically tailored so they have not been included here. Even if there are not any current injuries, it 
          is important to stretch and practice mobility exercises to keep the body free-moving and healthy!
        </p>

        <h5 className='pt-4 pb-2'>Disclaimer</h5>
        <p>
          These exercises are meant to be general examples and have yet to be tailored to the specific needs of the client, this tailoring 
          could include different exercise, rep, and order swaps.
        </p>

        <h5 className='pt-4 pb-2'>Bicep and Tricep</h5>
        <p>
          Dumbbell Preacher Curl (8-12 x 3)
          Face Away Bayesian Curl (8-12 x 3)
          Inverse Zottman Curl (8-12 x 3)
          EZ Bar Tricep Pushdown (8-12 x 3)
          Rope Overhead Tricep Extension (8-12 x 3)
          Cable Tricep Kickback (8-12 x 3)
        </p>

        <h5 className='pt-4 pb-2'>Back, Chest, and Shoulder</h5>
        <p>
          Chest Supported Row Machine (8-12 x 3)
          Wide Grip Lat Pulldown (8-12 x 3)
          Close Grip Cable Row (8-12 x 3)
          Barbell Bench Press (8-12 x 3)
          Flat Dumbbell Bench Press (8-12 x 3)
          Lean-In Lateral Raise (8-12 x 3)
          Cable Lateral Raise (8-12 x 3)
        </p>

        <h5 className='pt-4 pb-2'>Lower Body</h5>
        <p>
          Barbell Back Squat (8-12 x 3)
          Glute Kickback Machine (8-12 x 3)
          Machine Single Leg Extension (8-12 x 3)
          Romanian Deadlift (8-12 x 3)
          Barbell Hip Thrust (8-12 x 3)
          Barbell Incline Calf Raise (8-12 x 3)
        </p>

        <h5 className='pt-4 pb-2'>Core</h5>
        <p>
          Medicine Ball Russian Twists (30 each)
          Abdominal Machine (w/ crunching, 8-12 x 3)
          Weighted Plank (3 x 1 min)
          Side Plank (3 x 1 min each)
        </p>
      </Container>
    </>
  );
}

export default Weightlifting;