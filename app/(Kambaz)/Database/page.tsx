import courses from "./courses.json";
import modules from "./modules.json"
import assignments from "./assignment.json"
import users from "./users.json"
import enrollments from "./enrollments.json"

export { courses, modules, assignments, users, enrollments };

export default function DatabasePage() {
    console.log("run succesful");
    return (
        <div className="p-4">
        </div>
    );
}
