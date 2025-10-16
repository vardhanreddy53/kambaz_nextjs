"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Form, Button, Row, Col } from 'react-bootstrap';

import assignments from "../../../../Database/assignment.json";

const findAssignmentById = (aid: string) => {
    return assignments.find((assignment: any) => assignment._id === aid);
};

export default function AssignmentEditor() {
    const params = useParams();
    const { cid, aid } = params as { cid: string, aid: string };

    const assignment = findAssignmentById(aid);

    const defaultAssignment = {
        title: "New Assignment",
        description: "Assignment details go here.",
        points: 100,
        due: "2024-05-13T23:59",
        available: "2024-05-06T00:00",
        until: "2024-05-20T23:59",
    };

    const currentAssignment = assignment || defaultAssignment;

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="wd-name" 
                        defaultValue={currentAssignment.title} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        as="textarea" 
                        rows={5}
                        id="wd-description"
                        defaultValue={currentAssignment.description}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Label column sm={2} className="text-end">Points</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="number" 
                            id="wd-points" 
                            defaultValue={currentAssignment.points} 
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
                                    defaultValue={currentAssignment.due} 
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="wd-available-from-date" className="fw-bold">Available from</Form.Label>
                                        <Form.Control 
                                            type="datetime-local" 
                                            id="wd-available-from-date" 
                                            defaultValue={currentAssignment.available || currentAssignment.due} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label htmlFor="wd-until-date" className="fw-bold">Until</Form.Label>
                                        <Form.Control 
                                            type="datetime-local" 
                                            id="wd-until-date" 
                                            defaultValue={currentAssignment.until || currentAssignment.due} 
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <hr />
                <div className="d-flex justify-content-end">
                    <Link href={`/Courses/${cid}/Assignments`} passHref legacyBehavior>
                        <Button variant="secondary" className="me-2">
                            Cancel
                        </Button>
                    </Link>
                    <Link href={`/Courses/${cid}/Assignments`} passHref legacyBehavior>
                        <Button variant="danger">
                            Save
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}