import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        id="wd-account-link"
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Dashboard"
        id="wd-dashboard-link"
        className="text-center border-0 bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Dashboard"
        id="wd-course-link"
        className="text-white bg-black text-center border-0"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroupItem>

      <ListGroupItem
        action
        href="https://northeastern.instructure.com/calendar#view_name=month&view_start=2025-09-22"
        id="wd-calendar-link"
        className="text-white bg-black text-center border-0"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroupItem>

      <ListGroupItem
        action
        href="https://northeastern.instructure.com/conversations#filter=type=inbox"
        id="wd-inbox-link"
        className="text-white bg-black text-center border-0"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Labs"
        id="wd-labs-link"
        className="text-white bg-black text-center border-0"
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/"
        id="wd-home-link"
        className="text-white bg-black text-center border-0"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Home
      </ListGroupItem>
    </ListGroup>
  );
}