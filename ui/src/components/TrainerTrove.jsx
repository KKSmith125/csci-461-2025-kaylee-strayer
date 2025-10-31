import {Container, Image, Row, Col} from 'react-bootstrap';

function TrainerTrove() {
 return (
  <Container className='justify-content-center'>
      <h1 className='text-white display-4 text-center pb-2'>Meet Your Trainers!</h1>

      <Container className='text-center pt-4 pb-5'>
        <Row className='g-0'>
          <Col>
            <Image src='/GoofyGymPic.jpg' style={{height:'500px'}} fluid/>
          </Col>
          <Col>
            <Image src='/SeriousSoccerPic.jpg' style={{height:'500px'}} fluid/>
          </Col>
        </Row>
      </Container>

      <h1 className='text-white display-6 pt-4 pb-2'>Kaylee Strayer</h1>
      <p className='text-white'>
        Kaylee Strayer is a fitness professional with nearly two decades of experience in the world of sports
        and strength training. Starting as a lifelong soccer player competing at the NCAA level, she developed
        a deep passion for the science of performance and fitness. Her approach blends body-building, evidence-based
        training, and strength work - designed to help clients achieve lasting results while enjoying the journey.
        Kaylee's philosophy: <em>"Train smart, stay consistent, and have fun doing it.</em>
      </p>

      <h1 className='text-white display-6 pt-4 pb-2'>Specialties</h1>
      <p className='text-white'>
        Sports Training <br></br>
        Weightlifting <br></br>
        Body Recomposition <br></br>
        Nutrition
      </p>

      <h1 className='text-white display-6 pt-4 pb-2'>Fun Facts</h1>
      <p className='text-white'>
        Major in College: Computer Science <br></br>
        Favorite Food: Costco Chicken Bake <br></br>
        Favorite Activity: Playing Minecraft with Friends <br></br>
        Favorite Exercise: Face-Away Bayesian Curls <br></br>
        Favorite Animal: Dogs
      </p>
    </Container>
  );
}

export default TrainerTrove;