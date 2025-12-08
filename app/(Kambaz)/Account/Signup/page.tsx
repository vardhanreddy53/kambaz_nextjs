"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

interface SignupUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
}

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT",
    loginId: "",
    section: ""
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signup = async () => {
    try {
      setError("");
      
      if (!user.username || !user.password || !user.firstName || !user.lastName || !user.email) {
        alert("Please fill in all required fields (username, password, first name, last name, email)");
        return;
      }
      
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
      
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Failed to sign up. Please try again.");
      alert(err.response?.data?.message || "Failed to sign up. Please try again.");
    }
  };
  
  return (
    <div id="wd-signup-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      
      {/* Username */}
      <FormControl 
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2" 
        placeholder="username *"
        id="wd-username"
      />
      
      {/* Password */}
      <FormControl 
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-2" 
        placeholder="password *"
        type="password"
        id="wd-password"
      />
      
      {/* First Name */}
      <FormControl 
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="mb-2" 
        placeholder="first name *"
        id="wd-firstname"
      />
      
      {/* Last Name */}
      <FormControl 
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="mb-2" 
        placeholder="last name *"
        id="wd-lastname"
      />
      
      {/* Email */}
      <FormControl 
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2" 
        placeholder="email *"
        type="email"
        id="wd-email"
      />
      
      {/* Date of Birth */}
      <FormControl 
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        className="mb-2" 
        placeholder="date of birth"
        type="date"
        id="wd-dob"
      />
      
      {/* Role */}
      <select 
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="form-control mb-2"
        id="wd-role"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
      
      {/* Login ID */}
      <FormControl 
        value={user.loginId}
        onChange={(e) => setUser({ ...user, loginId: e.target.value })}
        className="mb-2" 
        placeholder="login ID (optional)"
        id="wd-loginid"
      />
      
      {/* Section */}
      <FormControl 
        value={user.section}
        onChange={(e) => setUser({ ...user, section: e.target.value })}
        className="mb-2" 
        placeholder="section (optional)"
        id="wd-section"
      />
      
      <Button onClick={signup} id="wd-signup-btn" className="w-100 mb-2">
        Sign up
      </Button>
      
      <Link id="wd-signin-link" href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}