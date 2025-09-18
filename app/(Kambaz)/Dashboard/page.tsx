import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS course image" />
            <div>
              <h5>CS5610 Webdev</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/datamining.jpg" width={200} height={150} alt="Data Mining course image" />
            <div>
              <h5>CS5800 Data Mining</h5>
              <p className="wd-dashboard-course-title">
                Data mining techniques and applications
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt="Algorithms course image" />
            <div>
              <h5>CS5100 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Advanced algorithms and data structures
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/os.jpeg" width={200} height={150} alt="Operating Systems course image" />
            <div>
              <h5>CS5700 Operating Systems</h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of modern operating systems
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/security.jpeg" width={200} height={150} alt="Security course image" />
            <div>
              <h5>CS5500 Software Security</h5>
              <p className="wd-dashboard-course-title">
                Principles of secure software design
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/network.jpeg" width={200} height={150} alt="Networking course image" />
            <div>
              <h5>CS5750 Computer Networks</h5>
              <p className="wd-dashboard-course-title">
                Introduction to networking protocols
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        {/*Course 7*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/6785" className="wd-dashboard-course-link">
            <Image src="/images/database.jpeg" width={200} height={150} alt="Networking course image" />
            <div>
              <h5>CS5200 Database Management SYstem</h5>
              <p className="wd-dashboard-course-title">
                Introduction to databases
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}