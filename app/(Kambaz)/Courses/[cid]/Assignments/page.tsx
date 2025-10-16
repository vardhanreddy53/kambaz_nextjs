"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineAssignment } from 'react-icons/md';
import { Button } from 'react-bootstrap';

import assignments from "../../../Database/assignment.json";

export default function Assignments() {
  const { cid } = useParams();

  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-25"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
        />
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <BsPlus className="fs-4" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <BsPlus className="fs-4" /> Assignment
          </Button>
        </div>
      </div>

      <div className="list-group rounded-0">
        <div className="list-group-item p-3 bg-secondary d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className="me-2 fs-5" />
            <strong>ASSIGNMENTS</strong>
          </div>
          <div>
            <BsPlus className="fs-4" />
            <HiOutlineDotsVertical className="fs-4" />
          </div>
        </div>

        <ul className="list-group list-group-flush" id="wd-assignment-list">
          {courseAssignments.length === 0 ? (
            <li className="list-group-item text-center text-muted p-4">
              No assignments found for this course.
            </li>
          ) : (
            courseAssignments.map((assignment: any) => (
              <li key={assignment._id} className="list-group-item wd-assignment-list-item">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-5 mt-1" />
                  <MdOutlineAssignment className="me-3 fs-3 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      className="wd-assignment-link text-dark fw-bold text-decoration-none"
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small">
                      <span className="text-danger">Multiple Modules</span> |
                      <br />
                      <strong>Due</strong> {assignment.due} | {assignment.points} pts
                    </div>
                  </div>
                  <div>
                    <FaCheckCircle className="text-success me-2" />
                    <HiOutlineDotsVertical className="fs-5" />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}