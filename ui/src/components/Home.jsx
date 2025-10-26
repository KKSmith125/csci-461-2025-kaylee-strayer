//Home page that includes fitness pictures, hook, introduction, information about me and the company as well as
// contact info
import {Col, Row, Container, Image} from 'react-bootstrap';

import '../App.css';

function Home() {
  return (
    <>
    {/*Hero Banner*/}
    <section className='hero-section text-white text-center d-flex align-items-center justify-content-center'>
      <div className='overlay'>
        <div className='hero-content'>
          <h1 className='display-3 fw-bold mb-3'>Build Strength. Gain Confidence. Love the Process.</h1>
          <p>Personal training designed to help you thrive - physically and mentally.</p>
        </div>
      </div>
    </section>

    {/*Images of personal training experience*/}
      <Container className='p-0' fluid>
        <Row className='g-0'>
          <Col>
            <Image src='https://blog.nasm.org/hubfs/client-communication.jpg' className='uniform-image'/>
          </Col>
          <Col>
            <Image src='https://gymvmt.com/wp-content/uploads/2023/04/no_promises.jpg' className='uniform-image'/>
          </Col>
          <Col>
            <Image src='https://cdn.shedefined.com.au/wp-content/uploads/2024/05/22135726/Are-you-exercising-safely-as-a-woman-Heres-what-to-ask-your-personal-trainer-960x540-1.jpg' className='uniform-image'/>
          </Col>
          <Col>
            <Image src='https://www.discoveryvillages.com/wp-content/uploads/2024/10/A-group-of-seniors-in-gym-with.jpg' className='uniform-image'/>
          </Col>
        </Row>
      </Container>

    {/*About*/}
   
    <Container fluid className='hero-section py-5'>
      <h2 className='text-white text-center mb-4 fw-bold'>About Strayer Fitness</h2>
      <p className='text-white text-center lead mb-5'>
        Empowering clients to move better, feel stronger, and enjoy every step of their fitness journey.
      </p>

      <Row className='text-white align-items-center'>
        <Col md={6}>
          <Image src='/SeriousSoccerPic.jpg' fluid rounded/>
        </Col>
        <Col md={6}>
          <p>
            Founded by <strong>Kaylee Strayer</strong>, a lifelong soccer player and passionate fitness coach,
            Strayer Fitness was created to make health and confidence accessible to everyone. With over 18 years
            of experience, Kaylee and her team combine science-based training, mental wellness, and a community-driven
            approach to help you be your best self.
          </p>
          <p>
            Whether you're just starting out or looking to take your fitness to the next level, our trainers will
            guide you with expertise, energy, and genuine care.
          </p>
        </Col>
      </Row>
    </Container>

    {/* Mission */}
    <section className='hero-section py-5'>
      <Container>
        <h2 className='text-white text-center mb-4 fw-bold'>Our Mission</h2>
        <p className='text-white text-center w-75 mx-auto'>
          We believe fitness should be fun, sustainable, and empowering. Our mission is to provide personalized
          training that helps clients not only look great but also feel confident, healthy, and fulfilled -
          inside and out.
        </p>
      </Container>
    </section>

    {/* Contact */}
    <Container fluid className='hero-section text-white py-5 text-center'>
      <h2 className='fw-bold mb-3'>Get in Touch</h2>
      <p className='mb-2'>Email: strayerFitness@outlook.com</p>
      <p>Phone Number: 614-603-1543</p>
    </Container>
    </>
  );
}

export default Home;