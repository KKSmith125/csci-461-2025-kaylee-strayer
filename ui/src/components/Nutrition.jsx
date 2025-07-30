import {Container, Image} from 'react-bootstrap';

function Nutrition() {
 return (
  <>
      <Container>
        <Image src='https://blog.nasm.org/hubfs/client-communication.jpg' fluid/>
      </Container>

      <Container className='justify-content-center'>
        <h2>Overview</h2>
        <p>
          Nutrition is often a big part of the conversation when it comes to fitness. While it is important to feed your 
          body what it needs in order to grow, it is often apparent that high emotions can accompany conversations about 
          "healthy" eating. Here at Strayer Fitness we aim to supply science-backed advice and recommendations that help 
          our clients meet their goals while also being accommodating to any special requirements an individual might 
          have pertaining to nutrition and mental health.
        </p>

        <h2>Tailoring</h2>
        <p>
          While there are broad ideas about nutrition that can be applied to the general population, there are tweaks and differences 
          that can be made on the individual level to better adapt to a client's lifestyle, goals, and preferences. When a client meets 
          with a trainer to talk about a tailored nutrition plan, the trainer will be able to learn more about their goals and current 
          lifestyle in order to tailor the general nutrition information to work better for the client.
        </p>

        <h2>General Tips</h2>
        <p>
          As discussed, while every person may have a different "ideal" nutrition plan, there are some broad guidelines that could 
          help a beginner start to discover what will work for them and their goals. Strayer Fitness aims to help the broader community 
          be able to get into fitness for as low a cost as possible, this is why we have detailed a few basic tips that could work for you!
        </p>

        <h4>Protein</h4>
        <p>
          Protein consumption is probably one of the most contested part of modern-day sports nutrition, with common recommendations ranging from 1g per pound 
          to a much more modest 0.7g per pound of body weight. The general consensus is that going over around 1.2g of protein per pound of body 
          weight will not increase muscle mass accumulation any more than 1.2g. If the client aims to put on a large amount of lean mass or wants 
          to maintain as much lean mass as possible during a fat-reduction phase, the more protein they will want to consume on a daily basis. However, if 
          a client is not looking to add as much muscle mass or is aiming for overall fitness, much less protein is necessary on a daily basis.
        </p>

        <h4>Carbohydrates, Fats, Fruits, and Vegetables</h4>
        <p>
          Carbohydrates are the next class of macro-nutrient that is often talked about when it comes to fitness. Carbohydrates main claim to fame is that they 
          are a great source of quickly-ready energy so that the body can perform better. These and fats are not to be avoided by any means when making a nutrition plan, they 
          are both an important part of a well-balanced diet and are each essential to the body on a daily basis. The amount of these consumed, however, is very 
          individual. The more protein a client needs, the less carbohydrates and fats they will generally consume. The way that this split is determined largely 
          depends on the clients needs and preferences. For instance, if they are an athlete who needs more fast-acting sources of energy, they may opt for a more carbohydrate-heavy 
          carbohydrate/fat split. However, if they prefer more fat-heavy meats, they may choose to do the opposite. In terms of micronutrients and other parts of 
          a well-balanced diet, it is generally recommended to get at least 5 servings of fruits and vegetables a day. About half coming from fruits and the other from 
          vegetables, these food groups are high in micronutrients that are absolutely essential for the body to carry out basic everyday tasks and to keep everything running 
          smoothly!
        </p>

        <h4>Supplements</h4>
        <p>
          In terms of supplements, there is one big one that is often discussed and has the most research to back it up: creatine. Creatine allows muscles to grow in size 
          by allowing water to accumulate in and around the muslce so that it increases in size. This increase in water availability also allows for better muscle performance in some 
          cases and muscle mass accumulation. Another supplement that is not essential but is helpful in getting in a client's daily protein goal are protein supplements and powders. When 
          choosing a protein supplement, making sure that the protein to sugar and other nutrients ratio is big is important to making sure that you are getting the best protein bang for 
          your buck. These are the 2 main and most supported supplements in the fitness world, in terms of overrall health, depending on the individual's needs, other supplements like calcium, 
          iron, vitamin C, a daily vitamin, or more may be recommended.
        </p>
      </Container>
    </>
  );
}

export default Nutrition;