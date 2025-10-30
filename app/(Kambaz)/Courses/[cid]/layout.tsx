"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb"; 
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";

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

interface RootState {
  coursesReducer: {
    courses: Course[];
  };
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  if (!course) {
    return (
      <div id="wd-courses">
        <h2 className="text-danger">Course Not Found (ID: {cid})</h2>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }}
          onClick={() => setShowNavigation(!showNavigation)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNavigation && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}