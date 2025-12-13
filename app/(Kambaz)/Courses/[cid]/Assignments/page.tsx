'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as client from "../../client";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface User {
  _id: string;
  role: string;
}

interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Assignments() {
  const { cid } = useParams();
  const courseId = cid as string;
  const dispatch = useDispatch();
  const router = useRouter();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // Check if user is Faculty or Admin (not Student)
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchAssignments = useCallback(async () => {
    if (!courseId) return;
    try {
      const fetchedAssignments = await client.findAssignmentsForCourse(courseId);
      dispatch(setAssignments(fetchedAssignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  }, [courseId, dispatch]);

  const onDeleteAssignment = async (assignmentId: string) => {
    if (!isFacultyOrAdmin) {
      console.warn("Students cannot delete assignments");
      return;
    }
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await client.deleteAssignment(courseId, assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div className="wd-assignments">
      <div className="d-flex justify-content-between mb-3">
        <h3>Assignments</h3>
        {/* Only show Add Assignment button for Faculty/Admin */}
        {isFacultyOrAdmin && (
          <Button variant="danger" onClick={() => router.push(`/Courses/${courseId}/Assignments/new`)}>
            + Assignment
          </Button>
        )}
      </div>

      {/* Show info message for students */}
      {!isFacultyOrAdmin && (
        <div className="alert alert-info">
          You are viewing assignments as a student. Assignment management is restricted to faculty and administrators.
        </div>
      )}

      <ListGroup className="rounded-0">
        {assignments.length === 0 && (
          <ListGroupItem className="text-center p-5 text-muted">
            No assignments available for this course.
          </ListGroupItem>
        )}
        {assignments.map(assignment => (
          <ListGroupItem key={assignment._id} className="wd-assignment p-3 mb-3 border">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-4" />
                <div 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => router.push(`/Courses/${courseId}/Assignments/${assignment._id}`)}
                >
                  <strong>{assignment.title}</strong>
                  <div className="text-muted small">
                    {assignment.points ?? 0} pts | Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleString() : "N/A"}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                {/* Only show Delete button for Faculty/Admin */}
                {isFacultyOrAdmin && (
                  <Button 
                    variant="link" 
                    className="text-danger p-0 ms-2" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAssignment(assignment._id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}