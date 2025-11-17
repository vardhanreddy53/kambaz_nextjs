"use client"
import { useEffect, useCallback } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../reducer";
import EnrollmentButton from "../../components/EnrollmentButton";
import * as client from "../client"; 
import { setEnrollments } from "../../Enrollments/reducer";

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

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface User {
  _id: string;
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

export default function CourseCatalog() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  
  const currentUserId = currentUser?._id || "123";

  // --- Data Fetching Logic ---
  const fetchAllData = useCallback(async () => {
    try {
      // 1. Fetch ALL courses for the catalog view
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));

      // 2. Fetch the current user's enrollments 
      const userEnrollments = await client.findEnrollmentsForUser(currentUserId);
      dispatch(setEnrollments(userEnrollments)); 

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentUserId, dispatch]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div id="wd-course-catalog" className="p-4">
      <h1 id="wd-catalog-title">Course Catalog (All Available Courses)</h1> <hr />

      {!currentUser && (
        <div className="alert alert-info">
          Sign in to enroll in courses. Viewing as Guest.
        </div>
      )}

      <h2 id="wd-available-courses">Available Courses ({courses.length})</h2> <hr />
      
      <div id="wd-catalog-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-catalog-course" style={{ width: "300px" }}>
              <Card>
                <CardImg
                  src={course.image || "/images/reactjs.png"}
                  variant="top"
                  width="100%"
                  height={160}
                  alt={course.name}
                />
                <CardBody>
                  <Link
                    href={`/Courses/${course._id}/Home`} 
                    className="wd-catalog-course-link text-decoration-none text-dark"
                  >
                    <CardTitle className="wd-catalog-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText className="wd-catalog-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                  </Link>

                  {/* Enrollment Management: Shows Enroll/Unenroll button */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <EnrollmentButton courseId={course._id} /> 
                    <Link href={`/Courses/${course._id}/Home`} className="btn btn-outline-primary">
                      View
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}