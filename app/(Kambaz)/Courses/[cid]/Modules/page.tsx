import React from 'react';

export default function Modules() {
  return (
    <div>
      <button>Expand</button> <button>Collapse all</button>
      <ul id="wd-modules">
        {/* Week 1 Module */}
        <li className="wd-module">
          <div className="wd-title">Week 1: Introduction to Web Development</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
                <li className="wd-content-item">Understand the role of HTML, CSS, and JavaScript</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1</li>
                <li className="wd-content-item">Git and GitHub - Chapter 1</li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Week 2 Module */}
        <li className="wd-module">
          <div className="wd-title">Week 2: CSS and Styling</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn core CSS concepts</li>
                <li className="wd-content-item">Master responsive design with Flexbox and Grid</li>
                <li className="wd-content-item">Practice with Tailwind CSS</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 2</li>
                <li className="wd-content-item">The Complete Guide to Flexbox</li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Week 3 Module */}
        <li className="wd-module">
          <div className="wd-title">Week 3: JavaScript Fundamentals</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understand basic JavaScript syntax</li>
                <li className="wd-content-item">Work with variables, data types, and functions</li>
                <li className="wd-content-item">Explore events and the DOM</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 4 Module */}
        <li className="wd-module">
          <div className="wd-title">Week 4: Introduction to React</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Explore the benefits of React</li>
                <li className="wd-content-item">Build a simple component</li>
                <li className="wd-content-item">Understand JSX and components</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 5 Module */}
        <li className="wd-module">
          <div className="wd-title">Week 5: State and Props</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn about state and props</li>
                <li className="wd-content-item">Use hooks to manage state</li>
                <li className="wd-content-item">Pass data between components</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}