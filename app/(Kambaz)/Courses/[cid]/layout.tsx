import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

export default function CoursesLayout(
  { children, params }: { children: ReactNode; params: { cid: string } }
) {
  const { cid } = params;
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" style={{ width: 200 }}>
              <CourseNavigation />
            </td>
            <td valign="top" style={{ width: "100%" }}>
              {" "}
              {children}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
