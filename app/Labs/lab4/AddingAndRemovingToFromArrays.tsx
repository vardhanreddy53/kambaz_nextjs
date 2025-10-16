export default function AddingAndRemovingToFromArrays() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];

  const todoArray = [
    <li key="initial-milk">Buy milk</li>, 
    <li key="initial-pets">Feed the pets</li>
  ];
  
  numberArray1.push(6); 
  stringArray1.push("string3");
  
  todoArray.push(<li key="pushed-dogs">Walk the dogs</li>);
  
  numberArray1.splice(2, 1); 
  stringArray1.splice(1, 1);
  
  return (
    <div id="wd-adding-removing-from-arrays">
      <h4>Add/remove to/from arrays</h4>
      numberArray1 = {numberArray1} <br />
      stringArray1 = {stringArray1} <br />
      Todo list:
      <ol>{todoArray}</ol><hr />
    </div> 
  );
}
