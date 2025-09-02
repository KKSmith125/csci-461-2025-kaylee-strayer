import {Container, Image, Row, Col} from 'react-bootstrap';

function TrainerTrove() {
 return (
  <>
      <Container className='d-flex justify-content-center align-items-center p-0' fluid>
        <Row className='g-0'>
          <Col>
            <Image src='/GoofyGymPic.jpg' className='uniform-height2' fluid/>
          </Col>
          <Col>
            <Image src='/SeriousSoccerPic.jpg' className='uniform-height2' fluid/>
          </Col>
        </Row>
      </Container>

      <Container className='justify-content-center'>
        <h1 className='display-5 pt-4 pb-2'>Kaylee Strayer</h1>
        <p>
          Kaylee Strayer is a trainer with around two decades worth of experience in the realm of fitness. Getting her start as a soccer player 
          for 18 years at many levels including NCAA, she branched out into a passion for the world of weightlifting, cardio, sports, and generally 
          pushing herself to be her best. She started looking into the science-based areas of the fitness community and has acquired a wealth of knowledge for 
          her passion of combining body-building, science-based, and strength techniques to chase her personal goals and is excited to help others reach their 
          own goals in the world of fitness. Her goal is to help her clients reach their goals while also growing their love for the process and having fun along 
          the way!
        </p>

        <h4 className='pt-4 pb-2'>Specialties</h4>
        <p>
          Sports Training <br></br>
          Weightlifting <br></br>
          Body Recomposition <br></br>
          Nutrition
        </p>

        <h4 className='pt-4 pb-2'>Fun Facts</h4>
        <p>
          Major in College: Computer Science <br></br>
          Favorite Food: Costco Chicken Bake <br></br>
          Favorite Activity: Playing Minecraft with Friends <br></br>
          Favorite Exercise: Face-Away Bayesian Curls <br></br>
          Favorite Animal: Dogs
        </p>
      </Container>
    </>
  );
}

export default TrainerTrove;