export default function lab1() {
  return (
    <div id="wd-lab1">
      <div id="wd-lab-headings">
        <h5>Lab 1</h5>
        <h5>HTML Examples</h5>
      </div>
      <div id="wd-h-tag">
        <h1>Heading Tag</h1>
        <p>
          In HTML, heading tags are used to define headings of different levels. They range from</p>
          <h1> the highest level i.e h1</h1>
          <h6>the lowest i.e h6</h6>
          <p>The size of the heading decreases as the number increases.
        </p>
        <h2>About Me</h2>
      <p>
        My name is Sai Vardhan Reddy Pathuri, and I am a current Masters student at Northeastern University.</p>
        <p>I am enrolled in the CS5610 Web Development course under Professor Jose.<br/>
        I am excited to build my web development portfolio through this class.<br/>
      </p>
    </div>
    <div id="wd-my-favorite-recipe">
  <h1>Simple Pasta Recipe</h1>
  
  <p>
    This is a quick and easy recipe for a delicious weeknight pasta dish. 
    It's a great option when you're short on time but still want a satisfying meal.
  </p>
  
  <h2>Ingredients</h2>
  <h5>Un ordered List</h5>
  <ul>
    <li>1 pound of your favorite pasta (spaghetti, penne, etc.)</li>
    <li>2 tablespoons of olive oil</li>
    <li>2-3 cloves of garlic,minced</li>
    <li>1 can of crushed tomatoes</li>
    <li>Salt and black pepper to taste</li>
    <li>Optional: Fresh basil or grated Parmesan cheese for garnish</li>
  </ul>
  
  <h2>Instructions</h2>
  <h5>Ordered list</h5>
  <ol>
    <li>Get a large pot with some water add salt and bring it to boil.</li>
    <li>Add the pasta to the boiling water(<b>do not break it!!!</b>) and cook according to the package directions until it's <b>al dente</b> (firm to the bite).</li>
    <li>While the pasta is cooking, heat the olive oil in a separate large pan over medium heat.</li>
    <li>Add the minced garlic and cook for about 1 minute, until it becomes fragrant. Be careful not to burn it.</li>
    <li>Pour the crushed tomatoes into the pan, season with salt and pepper, and bring to a simmer.</li>
    <li>Drain the cooked pasta and add it directly to the pan with the tomato sauce.</li>
    <li>Toss the pasta with the sauce until it is all evenly coated.</li>
    <li>Serve immediately, garnished with fresh basil or Parmesan cheese if desired.</li>
  </ol>
</div>
<h5>Un ordered List</h5>
My favorite books (in no particular order)
<ul id="wd-my-books">
  <li>Almanck of Naval Ravikanth</li>
  <li>Atomic Habits</li>
  <li>Hard things about hard things</li>
  <li>surrounded by idiots</li>
  <li>rich dad and poor dad</li>
</ul>
<div id="wd-tables">
  <h4>Table Tag</h4>
  <table border={1} width="100%">
    <thead>
      <tr>
        <th>Quiz</th>
        <th>Topic</th>
        <th>Date</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Q1</td>
        <td>HTML</td>
        <td>2/3/25</td>
        <td>91</td>
      </tr>
      <tr>
        <td>Q2</td>
        <td>CSS</td>
        <td>2/10/25</td>
        <td>99</td>
      </tr>
      <tr>
        <td>Q3</td>
        <td>JavaScript</td>
        <td>2/13/25</td>
        <td>93</td>
      </tr>
      <tr>
        <td>Q4</td>
        <td>React</td>
        <td>8/10/25</td>
        <td>87</td>
      </tr>
      <tr>
        <td>Q5</td>
        <td>Node.js</td>
        <td>8/17/25</td>
        <td>85</td>
      </tr>
      <tr>
        <td>Q6</td>
        <td>Databases</td>
        <td>8/24/25</td>
        <td>94</td>
      </tr>
      <tr>
        <td>Q7</td>
        <td>Authentication</td>
        <td>9/1/25</td>
        <td>90</td>
      </tr>
      <tr>
        <td>Q8</td>
        <td>Middleware</td>
        <td>9/8/25</td>
        <td>88</td>
      </tr>
      <tr>
        <td>Q9</td>
        <td>APIs</td>
        <td>9/15/25</td>
        <td>96</td>
      </tr>
      <tr>
        <td>Q10</td>
        <td>Deployment</td>
        <td>9/22/25</td>
        <td>92</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>total</td>
        <td>915</td>
        <td colSpan={1}>Average</td>
        <td>92</td>
      </tr>
    </tfoot>
  </table>
</div>
<div id="wd-images">
  <h5>Image tag</h5>
  Loading an image from the internet: <br />
  <img id="wd-starship" width="400px"   src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" alt="Starship"/>
  <br />
  Loading a local image:
  <br />
  <img id="wd-teslabot" src="/Tesla-Bot-AI.avif" height="200px" alt="TeslaBot"/>
  </div>
    </div>
  );
}
