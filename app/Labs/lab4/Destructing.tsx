export default function Destructing() {
  const person = { name: "Sai Vardhan Reddy", age: 21 };
  const { name, age } = person; 
  
  const numbers = ["one", "two", "three"];
  const [ first, second, third ] = numbers;
  
  return (
    <div id="wd-destructing">
      <h2>Destructing</h2>
      <h3>Object Destructing</h3>
      const &#123; name, age &#125; =
      &#123; name: &quot;Sai Vardhan Reddy&quot;, age: 21 &#125;<br /><br />
      name = {name}<br />
      age = {age}
      <h3>Array Destructing</h3>
      const [first, second, third] = [&quot;one&quot;,&quot;two&quot;,&quot;three&quot;]<br/><br/>
      first = {first}<br />
      second = {second}<br />
      third = {third}<hr />
    </div>
  );
}
