import {Container, Image, Row, Col, Card} from 'react-bootstrap';

function TrainerTrove() {
 return (
  <Container className='justify-content-center'>
      <h1 className='text-white display-4 text-center pb-2'>Meet Your Trainers!</h1>

      <Container className='text-center mb-5'>
        <Row className='justify-content-center g-0'>
          <Col xs={12} md={5}>
            <Image src='/GoofyGymPic.jpg' style={{height:'500px'}} fluid/>
          </Col>
          <Col xs={12} md={5}>
            <Image src='/SeriousSoccerPic.jpg' style={{height:'500px'}} fluid/>
          </Col>
        </Row>
      </Container>

      <Container className='px-md-5 mb-5'>
        <Card bg='dark' text='white' className='p-4 shadow-sm border-0 rounded-4'>
          <Card.Body>
            <Card.Title className='display-6 fw-bold text-center mb-4'>Kaylee Strayer</Card.Title>
            <Card.Text className='lead'>
              Kaylee Strayer is a fitness professional with nearly two decades of experience in the world of sports
              and strength training. Starting as a lifelong soccer player competing at the NCAA level, she developed
              a deep passion for the science of performance and fitness. Her approach blends body-building, evidence-based
              training, and strength work - designed to help clients achieve lasting results while enjoying the journey.
              Kaylee's philosophy: <em>"Train smart, stay consistent, and have fun doing it.</em>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
        
      <Row className='px-md-5 g-4'>
        <Col md={6}>
          <Card bg='dark' text='white' className='py-5 shadow-sm border-0 rounded-4 h-100'>
            <Card.Title className='fw-bold text-uppercase mb-3 text-center'>Specialties</Card.Title>
            <Card.Text className='text-center fs-5'>
              Sports Training <br/><br/>
              Weightlifting <br/><br/>
              Body Recomposition <br/><br/>
              Nutrition
            </Card.Text>
          </Card>
        </Col>

        <Col md={6}>
          <Card bg='dark' text='white' className='py-5 shadow-sm border-0 rounded-4 h-100'>
            <Card.Title className='fw-bold text-uppercase mb-3 text-center'>Fun Facts</Card.Title>
            <Card.Text className='text-center fs-5'>
              Major in College: Computer Science <br/><br/>
              Favorite Food: Costco Chicken Bake <br/><br/>
              Favorite Activity: Playing Minecraft with Friends <br/><br/>
              Favorite Exercise: Face-Away Bayesian Curls <br/><br/>
              Favorite Animal: Dogs
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainerTrove;