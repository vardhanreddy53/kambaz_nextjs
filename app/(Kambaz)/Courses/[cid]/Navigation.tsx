'use client'
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "people"];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        let dest: string;
        
        switch (link) {
          case "Piazza":
            dest = "https://piazza.com/";
            break;
          case "Zoom":
            dest = "https://zoom.com";
            break;
          case "Quizzes":
            dest = `https://northeastern.instructure.com/courses/${cid}/quizzes`;
            break;
          case "Grades":
            dest = `https://northeastern.instructure.com/courses/${cid}/grades`;
            break;
          default:
            dest = `/Courses/${cid}/${link}`;
        }

        const isActive = pathname.includes(`/${link}`);
        
        return (
          <Link
            key={link}
            href={dest}
            className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
            {...(link === "Piazza" || link === "Zoom" || link === "Quizzes" || link === "Grades" ? { target: "_blank" } : {})}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
} 