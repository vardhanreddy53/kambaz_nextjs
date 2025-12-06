"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as userClient from "../../../Account/client";
import * as enrollmentClient from "../../client";
import { FormControl } from "react-bootstrap";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function CoursePeople() {
  const { cid } = useParams();
  const courseId = cid as string;
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchEnrolledUsers = async () => {
    try {
      // Get all enrollments for this course
      const enrollments = await enrollmentClient.findUsersInCourse(courseId);
      
      // Get all users
      const allUsers = await userClient.findAllUsers();
      
      // Filter users who are enrolled in this course
      const enrolledUserIds = enrollments.map((e: Enrollment) => e.user);
      const enrolledUsers = allUsers.filter((user: User) => 
        enrolledUserIds.includes(user._id)
      );
      
      setUsers(enrolledUsers);
      setFilteredUsers(enrolledUsers);
    } catch (error) {
      console.error("Error fetching enrolled users:", error);
    }
  };

  const filterUsersByName = (searchName: string) => {
    setName(searchName);
    if (searchName) {
      const filtered = users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const filterUsersByRole = (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const filtered = users.filter(user => user.role === selectedRole);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    fetchEnrolledUsers();
  }, [courseId]);

  return (
    <div className="wd-course-people p-4">
      <h3>People</h3>
      
      <div className="d-flex mb-3">
        <FormControl 
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)} 
          placeholder="Search people"
          className="me-2 w-25 wd-filter-by-name" 
        />
        <select 
          value={role} 
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      {filteredUsers.length === 0 && (
        <div className="alert alert-info">
          No users enrolled in this course.
        </div>
      )}

      <PeopleTable users={filteredUsers} fetchUsers={fetchEnrolledUsers} />
    </div>
  );
}