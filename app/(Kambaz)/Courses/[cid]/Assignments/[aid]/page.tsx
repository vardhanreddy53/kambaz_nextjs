"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { createAssignmentForCourse, updateAssignment as clientUpdateAssignment } from "../../../client"; // Import client API
import { Form, Button, Row, Col } from 'react-bootstrap';

interface Assignment {
    _id: string;
    title: string;
    course: string;
    due: string;
    available: string;
    until: string;
    points: number;
    description: string;
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

    const isNew = assignmentId === "new";
    const existingAssignment = assignments.find((a) => a._id === assignmentId);

    const initialAssignmentState = {
        _id: isNew ? undefined : assignmentId,
        title: "New Assignment",
        course: courseId,
        description: "Assignment details go here.",
        points: 100,
        due: "2024-05-13T23:59",
        available: "2024-05-06T00:00",
        until: "2024-05-20T23:59",
    };
    
   
    const [assignment, setAssignment] = useState<Omit<Assignment, "_id"> & { _id?: string }>(initialAssignmentState);

  
    useEffect(() => {
        if (existingAssignment) {
            setAssignment(existingAssignment);
        }
    }, [existingAssignment]);

    const handleSave = async () => {
        if (isNew) {
           
            try {
                
                const assignmentToCreate = { ...assignment, _id: undefined }; 
                const newAssignment = await createAssignmentForCourse(courseId, assignmentToCreate);
                dispatch(addAssignment(newAssignment)); 
            } catch (error) {
                console.error("Error creating assignment:", error);
            }
        } else {
            
            try {
                const fullAssignment = assignment as Assignment;
                await clientUpdateAssignment(fullAssignment);
                dispatch(updateAssignment(fullAssignment)); 
            } catch (error) {
                console.error("Error updating assignment:", error);
            }
        }
        
        router.push(`/Courses/${courseId}/Assignments`);
    };

    const handleCancel = () => {
        router.push(`/Courses/${courseId}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <h3>{isNew ? "New Assignment" : "Edit Assignment"}</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="wd-name" 
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5}
                        id="wd-description"
                        value={assignment.description}
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Points</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number" 
                            id="wd-points" 
                            value={assignment.points}
                            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Assignment Group</Form.Label>
                    <Col sm={10}>
                        <Form.Select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Display Grade as</Form.Label>
                    <Col sm={10}>
                        <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Submission Type</Form.Label>
                    <Col sm={10}>
                        <div className="border p-3 rounded">
                            <Form.Select id="wd-submission-type" className="mb-3" defaultValue="ONLINE">
                                <option value="ONLINE">Online</option>
                                <option value="IN_PERSON">In-person</option>
                            </Form.Select>

                            <div>
                                <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                                <Form.Check 
                                    type="checkbox" 
                                    id="wd-text-entry"
                                    label="Text Entry"
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    id="wd-website-url"
                                    label="Website URL"
                                    defaultChecked
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    id="wd-media-recordings"
                                    label="Media Recordings"
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    id="wd-student-annotation"
                                    label="Student Annotation"
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    id="wd-file-uploads"
                                    label="File Uploads"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Assign</Form.Label>
                    <Col sm={10}>
                        <div className="border p-3 rounded">
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="wd-assign-to" 
                                    defaultValue="Everyone" 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
                                <Form.Control 
                                    type="datetime-local" 
                                    id="wd-due-date" 
                                    value={assignment.due.slice(0, 16)}
                                    onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="wd-available-from-date" className="fw-bold">Available from</Form.Label>
                                        <Form.Control 
                                            type="datetime-local" 
                                            id="wd-available-from-date" 
                                            value={assignment.available.slice(0, 16)}
                                            onChange={(e) => setAssignment({ ...assignment, available: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="wd-until-date" className="fw-bold">Until</Form.Label>
                                        <Form.Control 
                                            type="datetime-local" 
                                            id="wd-until-date" 
                                            value={assignment.until.slice(0, 16)}
                                            onChange={(e) => setAssignment({ ...assignment, until: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}