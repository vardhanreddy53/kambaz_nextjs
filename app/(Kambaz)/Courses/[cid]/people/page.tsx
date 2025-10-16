"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import usersData from "../../../Database/users.json";
import enrollmentsData from "../../../Database/enrollments.json";

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

const users: User[] = usersData as User[];
const enrollments: Enrollment[] = enrollmentsData as Enrollment[];

export default function PeopleTable() {
  const params = useParams();
  const cid = params.cid as string;

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users
            
            .filter((usr: User) =>
             
              enrollments.some(
                (enrollment: Enrollment) =>
                  enrollment.user === usr._id && enrollment.course === cid
              )
            )
            
            .map((user: User) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
