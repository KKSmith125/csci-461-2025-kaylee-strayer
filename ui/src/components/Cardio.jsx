import {Container, Row, Col, Image} from 'react-bootstrap';

function Cardio() {
  return (
    <>
    <h1 className='display-4 text-center pb-2'>Cardio</h1> <br></br>
    
    <Container className='d-flex justify-content-center align-items-center p-0 m-0' fluid>
        <Row className='g-0'>
          <Col>
            <Image src='https://www.discoveryvillages.com/wp-content/uploads/2024/10/A-group-of-seniors-in-gym-with.jpg' className='uniform-height' fluid/>
          </Col>
          <Col>
            <Image src='https://marathonhandbook.com/wp-content/uploads/Bodyweight-Cardio-Exercises-7.jpg' className='uniform-height' fluid/>
          </Col>
        </Row>
      </Container> <br></br>

    <Container className='justify-content-center'>
      <h1 className='display-6 pt-4 pb-2'>Overview</h1>
      <p>
        In my experience as a college athlete and fitness nerd, I have encountered five different
        categories of cardio: endurance, sprint, high-intensity interval training,
        low-intensity training, and sport-specific. In this section, I will provide a description for each one and provide 
        the benefits and other factors to help you decide which one(s) are best for you!
      </p>

      <h4 className='pt-4 pb-2'>Endurance</h4>
      <p>
        With endurance training, the main focus is to be able to do a certain activity for an increasingly
        long period of time and building your aerobic base (the foundation of cardio). This can be thought of as
        the tortoise in the race against the hare. This can include going on a long run where the focus is distance
        over pace. While endurance activity will eventually lead to better pace as well as distance, the primary goal 
        is to be able to build up the time and amount of a certain activity one can do.
        
        Tip: A helpful thing for beginners in running, a popular form of cardio and endurance training, is to set a 
        time for 45 minutes and just run without looking at the pace of distance for the first couple of runs. This can decrease
        anxiety over speed and increase enjoyment!
      </p>
      
      <h4 className='pt-4 pb-2'>Sprint</h4>
      <p>
        With sprint training, the main focus is to increase speed over a relatively short distance.
        This can be thought of as the hare in the hare in the race against the tortoise. This could include 
        repititions of anywhere from 50m to 400m dashes and are meant to increase the speed of which a person 
        can run. With this the focus is not to build up endurance as much so longer breaks should be taken between
        repetitions to ensure maximum force output on each repetition.

        Tip: Sprint training should be combined with some form of endurance training so that an aerobic base can be
        achieved and thus lend a helping hand in the race for speed!
      </p>

      <h4 className='pt-4 pb-2'>High-Intensity</h4>
      <p> 
        High-intensity interval training is an increasing hot topic in the world of fitness and cardio. This form 
        of training has the athlete work in a high heart rate range for a shorter period of time with rest breaks in
        between. It takes less time to complete and is a staple of those who want to get good, quality cardio in while 
        on a time crunch.

        Tip: Jumping rope, Fartlek runs, and some forms of sprint repetitions are all great options for HIIT (high-intensity interval training)!
      </p>

      <h4 className='pt-4 pb-2'>Low-Intensity</h4>
      <p>
        Unlike high-intensity interal training, low intensity interval training aims to have the athlete work in a relatively 
        low heart rate for an extended period of time. Benefits of this include lowering the physical strain on the body, less
        increase in hunger cues than high-stress training, and possibly a better form of cardio for fat loss (although any form of 
        cardio can be used for fat loss it all depends on preference).

        Tip: Steady-state cardio is another word for this type of cardio and can include activities like incline treadmill walking as well 
        as biking!
      </p>

      <h4 className='pt-4 pb-2'>Sport-Specific</h4>
      <p>
        As I'm sure most sport athletes will attest to sport-specific training deserves a category all its own. Each sport has curated different 
        forms of cardio that help the athlete prepare for their sport-specific needs. For instance, soccer has come up with workouts like 5000s,
        one that combines an increasing amount of sprinting with jogging to simulate the situation a player will find themselves in on the field.

        Tip: While the best way to prepare to go on the field, court, etc. is to practice playing the game, looking for sport-specific cardio drills 
        can definitely help prepare an athlete for the strains of their respective sport!
      </p>

      <h4 className='pt-4 pb-2'>Wrap-Up</h4>
      <p>
        I hope these little exerpts were helpful to you in your quest for fitness knowledge! For more specialized and in-depth information feel free 
        to schedule a free consultation with one of our amazing trainers in the Scheduling tab!
      </p>
    </Container>
    </>
  )
}

export default Cardio;