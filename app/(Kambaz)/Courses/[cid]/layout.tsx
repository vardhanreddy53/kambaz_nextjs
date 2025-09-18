import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

export default async function CoursesLayout(
  { children, params }: { children: ReactNode; params: Promise<{ cid: string }> }
) {
  const { cid } = params;
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", width: 200 }}>
              <CourseNavigation />
            </td>
            <td style={{ verticalAlign: "top", width: "100%" }}>
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
