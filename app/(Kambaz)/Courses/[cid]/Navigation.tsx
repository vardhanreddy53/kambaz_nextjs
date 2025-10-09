'use client'
import Link from "next/link";
import { useParams } from 'next/navigation';
export default function CourseNavigation() {
  const { cid } = useParams();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link href={`/Courses/${cid}/Home`} id="wd-course-home-link"
        className="list-group-item active border border-0"> Home </Link><br/>
      <Link href={`/Courses/${cid}/Modules`} id="wd-course-modules-link"
        className="list-group-item text-danger border border-0"> Modules </Link><br/>
      <Link href="https://piazza.com/" id="wd-course-piazza-link"
        className="list-group-item text-danger border border-0"> Piazza </Link><br/>
      <Link href="https://zoom.com" id="wd-course-zoom-link"
        className="list-group-item text-danger border border-0"> Zoom </Link><br/>
      <Link href={`/Courses/${cid}/Assignments`} id="wd-course-assignments-link"
        className="list-group-item text-danger border border-0"> Assignments </Link><br/>
      <Link href="https://northeastern.instructure.com/courses/225999/quizzes" id="wd-course-quizzes-link"
        className="list-group-item text-danger border border-0"> Quizzes </Link><br/>
      <Link href="https://northeastern.instructure.com/courses/225999/grades" id="wd-course-grades-link"
        className="list-group-item text-danger border border-0"> Grades </Link><br/>
      <Link href={`/Courses/${cid}/people`} id="wd-course-people-link"
        className="list-group-item text-danger border border-0"> People </Link><br/>
    </div>
  );
}