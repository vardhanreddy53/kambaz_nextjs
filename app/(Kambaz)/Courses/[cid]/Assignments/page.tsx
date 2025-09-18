import React from 'react';

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/123"
          >
            A1 - ENV + HTML
          </a>
          <div>
            Multiple Modules | Not available until May 6 at 12:00am | Due May
            13 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/124"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <div>
            Multiple Modules | Not available until May 13 at 12:00am | Due May
            20 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/125"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <div>
            Multiple Modules | Not available until May 20 at 12:00am | Due May
            27 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/126"
          >
            A4 - SERVER-SIDE DEVELOPMENT
          </a>
          <div>
            Multiple Modules | Not available until May 27 at 12:00am | Due Jun
            3 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/127"
          >
            A5 - DATABASE INTEGRATION
          </a>
          <div>
            Multiple Modules | Not available until Jun 3 at 12:00am | Due Jun
            10 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/128"
          >
            A6 - AUTHENTICATION & SECURITY
          </a>
          <div>
            Multiple Modules | Not available until Jun 10 at 12:00am | Due Jun
            17 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="/Courses/1234/Assignments/129"
          >
            A7 - DEPLOYMENT
          </a>
          <div>
            Multiple Modules | Not available until Jun 17 at 12:00am | Due Jun
            24 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
