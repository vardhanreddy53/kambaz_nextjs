"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaTrash, FaPlus, FaEllipsisV, FaGripVertical } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  due: string;
  available: string;
  until: string;
  points: number;
  description: string;
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
  assignmentsReducer: {
    assignments: Assignment[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);
  const isFaculty = currentUser?.role === "FACULTY";

  // Debug logs
  console.log("Current user:", currentUser);
  console.log("Is faculty?", isFaculty);
  console.log("User role:", currentUser?.role);

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const totalPoints = courseAssignments.reduce((sum, a) => sum + a.points, 0);
  const assignmentPercentage = 40;

  return (
    <div id="wd-assignments" className="p-4">
      {/* Search and Control Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignment"
            aria-label="Search for Assignment"
          />
        </InputGroup>
        
        <div className="d-flex align-items-center">
          <Button variant="outline-secondary" className="me-2">
            + Group
          </Button>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            + Assignment
          </Button>
          <Button variant="link" className="text-dark">
            <FaEllipsisV />
          </Button>
        </div>
      </div>

      {/* User Info Debug - Remove this after testing */}
      {currentUser && (
        <div className="alert alert-info mb-3">
          Signed in as: {currentUser.role} ({currentUser.firstName} {currentUser.lastName})
        </div>
      )}
      {!currentUser && (
        <div className="alert alert-warning mb-3">
          Not signed in. Sign in to manage assignments.
        </div>
      )}

      {/* Assignments Section */}
      <div className="border rounded">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
          <div className="d-flex align-items-center">
            <FaGripVertical className="me-2" />
            <IoMdArrowDropdown className="me-2" />
            <strong>ASSIGNMENTS</strong>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3">{assignmentPercentage}% of Total</span>
            <Button variant="link" className="text-dark p-0 me-2">
            </Button>
            <Button variant="link" className="text-dark p-0">
              <FaEllipsisV />
            </Button>
          </div>
        </div>

        {/* Assignment List */}
        {courseAssignments.length === 0 ? (
          <div className="text-center text-muted p-5">
            No assignments available for this course.
          </div>
        ) : (
          courseAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className="d-flex justify-content-between align-items-center p-3 border-bottom"
              style={{ borderLeft: "4px solid #28a745" }}
            >
              <div className="d-flex align-items-center flex-grow-1">
                <FaGripVertical className="me-3 text-muted" />
                <div
                  onClick={() => router.push(`/Courses/${cid}/Assignments/${assignment._id}`)}
                  style={{ cursor: "pointer" }}
                  className="flex-grow-1"
                >
                  <div>
                    <strong>{assignment.title}</strong>
                  </div>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span>
                    {" | "}
                    <strong>Due</strong> {new Date(assignment.due).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                    {" | "}
                    {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-success me-3" style={{ fontSize: "1.2rem" }}>✓</span>
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(assignment._id);
                  }}
                  title="Delete assignment"
                >
                  <FaTrash />
                </Button>
                <Button variant="link" className="text-dark p-0 ms-2">
                  <FaEllipsisV />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}