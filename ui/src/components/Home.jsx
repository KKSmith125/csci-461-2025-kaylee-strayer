//Home page that includes fitness pictures, hook, introduction, information about me and the company as well as
// contact info
import {Col, Row, Container, Image} from 'react-bootstrap';

function Home() {
  return (
    <>
    <h1 className='text-center'>StrayerFitness</h1>
    {/*Images of personal training experience*/}
      <Container>
        <Row>
          <Col fluid>
            <Image src='https://blog.nasm.org/hubfs/client-communication.jpg' fluid/>
          </Col>
          <Col fluid>
            <Image src='https://gymvmt.com/wp-content/uploads/2023/04/no_promises.jpg' fluid/>
          </Col>
          <Col fluid>
            <Image src='https://cdn.shedefined.com.au/wp-content/uploads/2024/05/22135726/Are-you-exercising-safely-as-a-woman-Heres-what-to-ask-your-personal-trainer-960x540-1.jpg' fluid/>
          </Col>
          <Col fluid>
            <Image src='https://www.discoveryvillages.com/wp-content/uploads/2024/10/A-group-of-seniors-in-gym-with.jpg' fluid/>
          </Col>
        </Row>
      </Container>

    {/*Hook and Introductions*/}
      <Container className='justify-content-center'>
        <h1 class='display-1'>Looking to build a strong fitness journey and have tons of fun along the way?</h1>
        <h1 class='display-4'>Background & Mission</h1>
        <p>
          As a soccer player since age three and an avid fitness enthusiast, founder Kaylee Strayer wanted to create a
          company that provided a format to express her passion and knowledge of the fitness industry in a way that bettered 
          the health of others. Knowing all too well the challenges of keeping up a healthy mindset while also keeping a healthy
          body, she aims to share the wealth of knowledge she has aquired over her more than 18 years of experience with everyone 
          who wants to start their fitness journey and enjoy the process. Our team of experience trainers exude excitement and passion 
          and love to have a good time with their clients while making sure they are providing the best tips and tricks for the betterment 
          of the client. If this sounds like something you are interested in or have any questions for the team, please contact us either
          through our contact information below or through our scheduling portal! We look forward to hearing from you! There are also some
          tips and tricks in our other sections that are offered free of charge as part of our committment to making fitness
          available to everyone, feel free to have a look around!
        </p>
        <h1 class='display-4'>Contact</h1>
        <p>Email: strayerFitness@outlook.com</p>
        <p>Phone Number: 614-603-1543</p>
      </Container>
    </>
  );
}

export default Home;