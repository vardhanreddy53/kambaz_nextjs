import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Vardhan", age: 24 });
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <FormControl
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <FormControl
        value={person.age} type="number"
        onChange={(e) => setPerson({ ...person,
                                     age: parseInt(e.target.value) })}
      />
      <hr/>
    </div>
  );
}