"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3>Signin</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text"
            placeholder="username" 
            className="wd-username" 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            type="password"
            placeholder="password" 
            className="wd-password" 
          />
        </Form.Group>
        <Link href="/Dashboard" id="wd-signin-btn">
          <Button variant="primary" className="w-100 mb-2">
            Signin
          </Button>
        </Link>
        <Link href="/Account/Signup" id="wd-signup-link">
          Signup
        </Link>
      </Form>
    </div>
  );
}