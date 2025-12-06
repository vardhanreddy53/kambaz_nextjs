'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment, addAssignment } from "../reducer";
import * as client from "../../../client";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  course: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const courseId = cid as string;
  const assignmentId = aid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const isNew = assignmentId === 'new';
  
  const [formData, setFormData] = useState<Partial<Assignment>>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
  });

  useEffect(() => {
    if (!isNew) {
      const assignment = assignments.find(a => a._id === assignmentId);
      if (assignment) {
        setFormData(assignment);
      }
    }
  }, [assignmentId, assignments, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isNew) {
        const newAssignment = await client.createAssignmentForCourse(courseId, {
          ...formData,
          course: courseId,
        });
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await client.updateAssignment(courseId, {
          ...formData,
          _id: assignmentId,
          course: courseId,
        } as Assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      router.push(`/Courses/${courseId}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <div className="wd-assignment-editor">
      <h3>{isNew ? 'New Assignment' : 'Edit Assignment'}</h3>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={formData.points || 0}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            value={formData.availableFrom ? new Date(formData.availableFrom).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={formData.availableUntil ? new Date(formData.availableUntil).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="danger" type="submit">
            Save
          </Button>
          <Button variant="secondary" onClick={() => router.push(`/Courses/${courseId}/Assignments`)}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}