//Includes session scheduling form and session options/other information
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Scheduling () {
  return (
    <Container fluid className='hero-section text-white py-5'>
      {/* Header */}
      <header className='text-center mb-5'>
        <h1 className='display-3 fw-bold'>Getting Started</h1>
        <p className='lead text-light'>
          Begin your journey toward a stronger, healthier you - one session at a time.
        </p>
      </header>
      
      {/* Information */}
      <section className='mb-5 px-md-5'>
        <h4 className='fw-bold text-uppercase'>General Information</h4>
        <p className='mt-3'>
          Your first consultation session is <strong>completely free</strong>. When scheduling the session, you'll
          provide basic information like height, weight, and age so your trainer can design a plan that fits you perfectly.
          During the consult, you'll have the opportunity to talk with your perspective trainer and get a feel for which one
          of our flexible training packages below would be best for you!
        </p>
      </section>

        {/* Packages */}
      <section className='px-md-5'>
        <h5 className='fw-bold text-uppercase mb-4'>Packages & Customizability</h5>
        <p>
          Every plan can be customized to meet your unique goals and schedule. Pricing may vary depending on the number of sessions,
          inclusion of nutrition guidance, and virtual options.
        </p>
        
        <Row className='g-4 pt-3'>
          {/* Solo Journey */}
          <Col md={4}>
            <Card bg='dark' text='white' className='h-100 shadow-sm'>
              <Card.Body>
                <Card.Title className='fw-bold text-uppercase'>Solo Journey</Card.Title>
                <Card.Text>
                  Get personalized nutrition and workout plans designed for independence. Includes virtual check-ins with your trainer
                  for accountability and guidance.
                </Card.Text>
                <p className='fw-bold mb-0'>Cost: $100 per week</p>
              </Card.Body>
            </Card>
          </Col>

          {/* 50/50 Package */}
          <Col md={4}>
            <Card bg='dark' text='white' className='h-100 shadow-sm'>
              <Card.Body>
                <Card.Title className='fw-bold text-uppercase'>50/50 Package</Card.Title>
                <Card.Text>
                  Combine personal training and at-home flexibility. Includes up to 3 in-person sessions weekly
                  and full programming support from your trainer.
                </Card.Text> 
                <p className='fw-bold mb-0'>Cost: $300 per week</p>
              </Card.Body>
            </Card>
          </Col>
        
        {/* Full Package */}
          <Col md={4}>
            <Card bg='dark' text='white' className='h-100 shadow-sm'>
              <Card.Body>
                <Card.Title className='fw-bold text-uppercase'>Full Package</Card.Title>
                <Card.Text>
                  For those ready to go all in - up to 5 sessions per week, complete nutritional guidance, and daily cardio +
                  weightlifting programming.
                </Card.Text> 
                <p className='fw-bold mb-0'>Cost: $500 per week</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Disclaimer */}
      <section className='text-center mt-5 px-md-5'>
        <h5 className='fw-bold text-uppercase'>Disclaimer</h5>
        <p>
        We aim to be affordable while providing high-quality, effective training. If you 
        find a more competitive rate, please reach out - we'd love to work something out!
        </p>
      </section>
      
      {/* Scheduling Buttons */}
      <div className='text-center mt-4'>
        <Link to='/sessions/new'>
          <Button className='m-2 fw-bold' variant='outline-light' size='lg'>Schedule a Session!</Button>
        </Link>
        <Link to='/clients/new'>
          <Button className='m-2 fw-bold' variant='outline-light' size='lg'>Sign Up As A Client!</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Scheduling;