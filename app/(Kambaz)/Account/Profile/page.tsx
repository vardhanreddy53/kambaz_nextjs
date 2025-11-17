"use client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, Form } from "react-bootstrap";
import * as client from "../client";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}



export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };


  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  if (!profile) {
    return null;
  }

  return (
    <div id="wd-profile-screen" className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-username"
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-password"
            type="password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-firstname"
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-lastname"
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-dob"
            type="date"
            value={profile.dob?.split('T')[0]}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control 
            id="wd-email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select 
            id="wd-role"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>
        <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </Button>
        <Button onClick={signout} variant="danger" className="w-100 mb-2" id="wd-signout-btn">
          Sign out
        </Button>
      </Form>
    </div>
  );
}