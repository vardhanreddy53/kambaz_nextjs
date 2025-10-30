 import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("Vardhan");
  return (
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <FormControl
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
      <hr/>
    </div>
  );
}