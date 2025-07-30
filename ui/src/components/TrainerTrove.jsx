import {Container, Image} from 'react-bootstrap';

function Weightlifting() {
 return (
  <>
      <Container>
        <Row>
          <Col>
            <Image src='/GoofyGymPic.jpg' fluid/>
          </Col>
          <Col>
            <Image src='/SeriousSoccerPic.jpg' fluid/>
          </Col>
        </Row>
      </Container>

      <Container className='justify-content-center'>
        <h1 className='display-3'>Kaylee Strayer</h1>
        <p>
          Kaylee Strayer is a trainer with around two decades worth of experience in the realm of fitness. Getting her start as a soccer player 
          for 18 years at many levels including NCAA, she branched out into a passion for the world of weightlifting, cardio, sports, and generally 
          pushing herself to be her best. She started looking into the science-based areas of the fitness community and has acquired a wealth of knowledge for 
          her passion of combining body-building, science-based, and strength techniques to chase her personal goals and is excited to help others reach their 
          own goals in the world of fitness. Her goal is to help her clients reach their goals while also growing their love for the process and having fun along 
          the way!
        </p>

        <h2>Specialties</h2>
        <p>
          Sports Training 
          Weightlifting 
          Body Recomposition 
          Nutrition
        </p>

        <h4>Fun Facts</h4>
        <p>
          Major in College: Computer Science 
          Favorite Food: Costco Chicken Bake 
          Favorite Activity: Playing Minecraft with Friends 
          Favorite Exercise: Face-Away Bayesian Curls
          Favorite Animal: Dogs
        </p>
      </Container>
    </>
  );
}

export default TrainerTrove;