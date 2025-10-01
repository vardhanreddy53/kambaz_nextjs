import { FaGraduationCap, FaGlobeAmericas, FaLaptopCode, FaBookOpen, FaCity, FaPlaneDeparture } from "react-icons/fa";

export default function ReactIcons() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4">
      <h3>React Icons Sampler</h3>
      <div className="d-flex gap-3">
        <FaGraduationCap className="fs-3 text-primary" title="Graduation" />
        <FaGlobeAmericas className="fs-3 text-success" title="International Student" />
        <FaLaptopCode className="fs-3 text-danger" title="Computer Science" />
        <FaBookOpen className="fs-3 text-warning" title="Books & Study" />
        <FaCity className="fs-3 text-info" title="Boston" />
        <FaPlaneDeparture className="fs-3 text-secondary" title="Travel" />
      </div>
    </div>
  );
}
