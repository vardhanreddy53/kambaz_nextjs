import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb"; 
import * as db from "../../Database/page";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = await params;
  const course = db.courses.find((c) => c._id === cid);

  if (!course) {
    return (
      <div id="wd-courses">
        <h2 className="text-danger">Course Not Found (ID: {cid})</h2>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <Breadcrumb courseName={course.name} />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}