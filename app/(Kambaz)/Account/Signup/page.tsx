"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
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
        <Form.Group className="mb-3">
          <Form.Control 
            type="password"
            placeholder="verify password" 
            className="wd-password-verify" 
          />
        </Form.Group>
        <Link href="/Account/Profile">
          <Button variant="primary" className="w-100 mb-2">
            Signup
          </Button>
        </Link>
        <Link href="/Account/Signin">
          Signin
        </Link>
      </Form>
    </div>
  );
}