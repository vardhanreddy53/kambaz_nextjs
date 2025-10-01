"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            defaultValue="Vardhan" 
            placeholder="username" 
            className="wd-username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="password"
            defaultValue="123123123" 
            placeholder="password"
            className="wd-password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            defaultValue="Vardhan" 
            placeholder="First Name" 
            id="wd-firstname"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            defaultValue="Reddy" 
            placeholder="Last Name" 
            id="wd-lastname"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="date"
            defaultValue="2004-02-29" 
            id="wd-dob"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="email"
            defaultValue="Vardhan@northeastern" 
            placeholder="email" 
            id="wd-email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select defaultValue="STUDENT" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>
        <Link href="/Account/Signin">
          <Button variant="danger" className="w-100">
            Signout
          </Button>
        </Link>
      </Form>
    </div>
  );
}