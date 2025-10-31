"use client"
import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import * as db from "../Database/page";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image: string;
}

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
  coursesReducer: {
    courses: Course[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState<Course>({
    _id: "0", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    department: "Computer Science",
    credits: 4,
    image: "/images/reactjs.png", 
    description: "New Description"
  });

  // Filter courses based on enrollment if user is logged in
  const displayedCourses = currentUser 
    ? courses.filter((course) =>
        db.enrollments.some(
          (enrollment: { user: string; course: string }) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        ))
    : courses; // Show all courses if no user is logged in

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => dispatch(addNewCourse(course))}> 
          Add 
        </button>
        <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} 
                id="wd-update-course-click">
          Update 
        </button>
      </h5>
      <br />
      
      <FormControl 
        value={course.name} 
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} 
        placeholder="Course Name"
      />
      <FormControl 
        value={course.description} 
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        placeholder="Course Description"
      />
      
      <hr />
      
      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2> <hr />
      
      {!currentUser && (
        <div className="alert alert-info">
          Please sign in to view your enrolled courses.
        </div>
      )}

      {currentUser && displayedCourses.length === 0 && (
        <div className="alert alert-warning">
          You are not enrolled in any courses yet.
        </div>
      )}
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`} 
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image || "/images/reactjs.png"}
                    variant="top"
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    <button 
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end">
                      Edit
                    </button>
                    <button 
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(course._id));
                      }} 
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}