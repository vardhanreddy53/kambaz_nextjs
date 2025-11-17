import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}lab5/todos`;

  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* Retrieve all */}
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      {/* Retrieve by ID */}
      <h4>Retrieve by ID</h4>
      <a
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>

      <FormControl
        className="w-50"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* Filter */}
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />

      {/* Create */}
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      {/* Delete */}
      <a
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo ID = {todo.id}
      </a>

      <FormControl
        className="w-50"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* Update Title */}
      <h3>Update Title</h3>

      <a
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title
      </a>

      <FormControl
        className="w-25 float-start me-2"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />

      <FormControl
        className="w-50 float-start"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h3>Update Completed</h3>

<a
  className="btn btn-primary float-end"
  href={`${API}/${todo.id}/completed/${todo.completed}`}
>
  Update Completed
</a>

<FormControl
  className="w-25 float-start me-2"
  value={todo.id}
  onChange={(e) => setTodo({ ...todo, id: e.target.value })}
/>

<select
  className="form-select w-25 float-start"
  value={String(todo.completed)}
  onChange={(e) =>
    setTodo({ ...todo, completed: e.target.value === "true" })
  }
>
  <option value="true">true</option>
  <option value="false">false</option>
</select>

<br /><br /><hr />
<h3>Update Description</h3>

<a
  className="btn btn-primary float-end"
  href={`${API}/${todo.id}/description/${encodeURIComponent(
    todo.description
  )}`}
>
  Update Description
</a>


<FormControl
  className="w-25 float-start me-2"
  value={todo.id}
  onChange={(e) => setTodo({ ...todo, id: e.target.value })}
/>

<FormControl
  className="w-50 float-start"
  value={todo.description}
  onChange={(e) => setTodo({ ...todo, description: e.target.value })}
/>

<br /><br /><hr />
    </div>
  );
}
