import React from 'react';

export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>
      <button>Unpublish</button> <button>Publish</button>
      <ul className="list-group">
        <li className="list-group-item">
          <button>Import Existing Content</button>
        </li>
        <li className="list-group-item">
          <button>Import from Commons</button>
        </li>
        <li className="list-group-item">
          <button>Choose Home Page</button>
        </li>
        <li className="list-group-item">
          <button>View Course Stream</button>
        </li>
        <li className="list-group-item">
          <button>New Announcement</button>
        </li>
        <li className="list-group-item">
          <button>New Analytics</button>
        </li>
        <li className="list-group-item">
          <button>View Course Notifications</button>
        </li>
      </ul>
    </div>
  );
}