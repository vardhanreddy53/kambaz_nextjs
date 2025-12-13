"use client"
import { useEffect } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "./reducer";
import { setEnrollments, removeEnrollment } from "../Enrollments/reducer"; 
import * as client from "./client";

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

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface RootState {
  coursesReducer: {
    courses: Course[];
  };
  accountReducer: {
    currentUser: User | null;
  };
  enrollmentsReducer: {
    enrollments: Enrollment[];
  };
}

export default function MyCoursesPage() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const currentUserId = currentUser?._id || "123";

  // Students can unenroll themselves, Faculty/Admin can also unenroll
  const handleUnenroll = async (courseId: string) => {
    try {
      await client.unenrollFromCourse(currentUserId, courseId);
      dispatch(removeEnrollment({ user: currentUserId, course: courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      // Fetch all courses
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));

      // Fetch user enrollments
      if (currentUserId) {
        const userEnrollments = await client.findEnrollmentsForUser(currentUserId);
        dispatch(setEnrollments(userEnrollments));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentUserId]); 

  // Filter courses to show only enrolled courses
  const enrolledCourseIds = enrollments.map(e => e.course);
  const enrolledCourses = courses.filter(course => enrolledCourseIds.includes(course._id));

  return (
    <div id="wd-my-courses" className="p-4">
      <h1 id="wd-my-courses-title">My Courses</h1> <hr />

      {!currentUser && (
        <div className="alert alert-warning">
          Please sign in to view your enrolled courses.
        </div>
      )}

      {currentUser && enrolledCourses.length === 0 && (
        <div className="alert alert-info">
          You are not enrolled in any courses yet. Visit the <Link href="/Dashboard">Dashboard</Link> to enroll in courses.
        </div>
      )}

      <h2 id="wd-enrolled-courses">Enrolled Courses ({enrolledCourses.length})</h2> <hr />

      <div id="wd-enrolled-courses-list">
        <Row xs={1} md={5} className="g-4">
          {enrolledCourses.map((course) => (
            <Col key={course._id} className="wd-enrolled-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-enrolled-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image || "/images/reactjs.png"}
                    variant="top"
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <CardBody>
                    <CardTitle className="wd-enrolled-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText className="wd-enrolled-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      {/* All users (students, faculty, admin) can unenroll from their own courses */}
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnenroll(course._id);
                        }}
                      >
                        Unenroll
                      </Button>
                      <Button variant="primary" size="sm">Go</Button>
                    </div>
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