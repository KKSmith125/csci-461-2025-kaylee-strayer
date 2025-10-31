import {Container, Row, Col, Image} from 'react-bootstrap';

function Cardio() {
  return (
    <Container className='justify-content-center'>
      <h1 className='text-white display-4 text-center pb-2'>Cardio</h1>

      <Container className='text-center pt-4 pb-2' style={{height: '400px'}}>
        <Row className='g-0'>
          <Col>
            <Image src='https://www.discoveryvillages.com/wp-content/uploads/2024/10/A-group-of-seniors-in-gym-with.jpg' className='h-100' fluid/>
          </Col>
          <Col>
            <Image src='https://marathonhandbook.com/wp-content/uploads/Bodyweight-Cardio-Exercises-7.jpg' className='h-100' fluid/>
          </Col>
        </Row>
      </Container>

      <h1 className='text-white display-6 pt-4 pb-2'>Overview</h1>
      <p className='text-white'>
        In my experience as a college athlete and fitness enthusiast, I've found that most cardio training falls into five categories:
        endurance, sprint, high-intensity interval training (HIIT), low-intensity training, and sport-specific cardio. In this section,
        I'll describe each type, explain its benefits, and help you determine which one-or combination-might be best for you!
      </p>

      <h1 className='text-white display-6 pt-4 pb-2'>Endurance</h1>
      <p className='text-white'>
        Endurance training focuses on sustaining an activity for longer periods and building your aerobin base-the foundation of all cardio.
        Think of it as the "tortoise" in the race against the hard. A common example is going for a long run where distance, not speed, is
        the goal. Over time, both endurance and pace naturally improve as your stamina builds.
        
      </p>
      <p className='text-white'>
        <em>Tip:</em> For beginners, try setting a timer for 45 minutes and running without checking your pace or distance. This can help
        reduce anxiety about performance and make running more enjoyable!
      </p>

      <h1 className='text-white display-6 pt-4 pb-2'>Sprint</h1>
      <p className='text-white'>
        Sprint training aims to increase speed over short distances-it's the "hare" of the cardio world. Typical sessions might include
        multiple repetitions of 50-400m sprints, emphasizing explosive effort with long rest periods to maintain maximum intensity. This
        type of training enhances speed and power rather than endurance.
      </p>
      <p className='text-white'>
        <em>Tip:</em> Pair sprint training with endurance workouts to build an aerobic base that supports faster recovery and sustained speed.
      </p>

      <h5 className='text-white pt-4 pb-2'>High-Intensity Interval Training (HIIT)</h5>
      <p className='text-white'>
        HIIT involves alternating between shorts bursts of intense effort and periods of rest or light activity. It's a time-efficient way to
        improve cardiovascular health and burn calories. Because it's so adaptable, HIIT has become a favorite among people with busy schedules.
      </p>
      <p className='text-white'>
        <em>Tip:</em> Great HIIT options include jump rope circuits, Fartlek runs, and structured sprint intervals.
      </p>

      <h5 className='text-white pt-4 pb-2'>Low-Intensity Training</h5>
      <p className='text-white'>
        Low-intensity steady-state (LISS) cardio keeps your heart rate in a lower zone for a longer duration. It's gentler on the body, often
        easier to recover from, and can help manage hunger and fatigue. It's an excellent option for those looking to stay active without
        overtraining.
      </p>
      <p className='text-white'>
        <em>Tip: </em> Incline treadmill walking and biking are both examples of LISS cardio.
      </p>

      <h5 className='text-white pt-4 pb-2'>Sport-Specific Cardio</h5>
      <p className='text-white'>
        Every sport has its own cardio demands, which is why sport-specific training deserves its own category. For example, soccer players
        often run drills like the "5000" that combine sprints and jogs to mimic the intensity shifts of a match. These workouts train both
        endurance and explosiveness in sport-like conditions.
      </p>
      <p className='text-white'>
        <em>Tip: </em> The best way to prepare for your sport is to play it-but adding targeted cardio drills can give you a serious performance
        boost!
      </p>

      <h5 className='text-white pt-4 pb-2'>Wrap-Up</h5>
      <p className='text-white'>
        I hope these overviews gave you a better understanding of the different cardio options and how they can help you reach your goals. For
        more personalized advice, feel free to schedule a free consultation with one of our trainers through the Scheduling tab!
      </p>
    </Container>
  );
}

export default Cardio;