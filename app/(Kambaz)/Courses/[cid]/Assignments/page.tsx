"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineAssignment } from 'react-icons/md';
import { Button } from 'react-bootstrap';

export default function Assignments() {
  const { cid } = useParams();
  
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-25"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
        />
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <BsPlus className="fs-4" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <BsPlus className="fs-4" /> Assignment
          </Button>
        </div>
      </div>

      <div className="list-group rounded-0">
        <div className="list-group-item p-3 bg-secondary d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className="me-2 fs-5" />
            <strong>ASSIGNMENTS</strong>
          </div>
          <div>
            <BsPlus className="fs-4" />
            <HiOutlineDotsVertical className="fs-4" />
          </div>
        </div>

        <ul className="list-group list-group-flush" id="wd-assignment-list">
          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/123`}
                >
                  A1 - ENV + HTML
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am | 
                  <br />
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/124`}
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 13 at 12:00am |
                  <br />
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/125`}
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am |
                  <br />
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/126`}
                >
                  A4 - SERVER-SIDE DEVELOPMENT
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 27 at 12:00am |
                  <br />
                  <strong>Due</strong> Jun 3 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/127`}
                >
                  A5 - DATABASE INTEGRATION
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until Jun 3 at 12:00am |
                  <br />
                  <strong>Due</strong> Jun 10 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/128`}
                >
                  A6 - AUTHENTICATION & SECURITY
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until Jun 10 at 12:00am |
                  <br />
                  <strong>Due</strong> Jun 17 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>

          <li className="list-group-item wd-assignment-list-item">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-dark fw-bold text-decoration-none"
                  href={`/Courses/${cid}/Assignments/129`}
                >
                  A7 - DEPLOYMENT
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until Jun 17 at 12:00am |
                  <br />
                  <strong>Due</strong> Jun 24 at 11:59pm | 100 pts
                </div>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <HiOutlineDotsVertical className="fs-5" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}