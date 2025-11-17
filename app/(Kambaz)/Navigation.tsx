import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import React from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  Icon: React.ElementType;
  isLink?: boolean;
  active?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "wd-account-link",
    label: "Account",
    href: "/Account",
    Icon: FaRegCircleUser,
    isLink: true,
  },
  {
    id: "wd-dashboard-link",
    label: "Dashboard",
    href: "/Dashboard",
    Icon: AiOutlineDashboard,
    isLink: true,
    active: true,
  },
  {
    id: "wd-course-link",
    label: "Courses",
    href: "/Courses",  // Changed from /Dashboard to /Courses
    Icon: LiaBookSolid,
    isLink: true,
  },
  {
    id: "wd-calendar-link",
    label: "Calendar",
    href: "https://northeastern.instructure.com/calendar#view_name=month&view_start=2025-09-22",
    Icon: IoCalendarOutline,
    isLink: false,
  },
  {
    id: "wd-inbox-link",
    label: "Inbox",
    href: "https://northeastern.instructure.com/conversations#filter=type=inbox",
    Icon: FaInbox,
    isLink: false,
  },
  {
    id: "wd-labs-link",
    label: "Labs",
    href: "/Labs",
    Icon: LiaCogSolid,
    isLink: true,
  },
  {
    id: "wd-home-link",
    label: "Home",
    href: "/",
    Icon: AiOutlineDashboard,
    isLink: true,
  },
];

export default function KambazNavigation() {
  const inactiveLinkClasses = "text-white bg-black";
  const activeLinkClasses = "bg-white text-danger";
  const baseLinkClasses = "text-center border-0";
  const iconSize = "fs-1";

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
        <img src="/images/NEU.png" width="75px" alt="NEU Logo" />
      </ListGroupItem>

      {navItems.map(({ id, label, href, Icon, isLink, active }) => {
        const itemClasses = active 
          ? activeLinkClasses 
          : `${inactiveLinkClasses} ${label === 'Account' ? 'text-white' : 'text-danger'}`;
        
        const iconClasses = active 
          ? "text-danger" 
          : (label === "Account" ? "text-white" : "text-danger");

        const itemProps = isLink 
          ? { as: Link, href } 
          : { action: true, href, target: label !== 'Inbox' && label !== 'Calendar' ? '_self' : '_blank' };

        return (
          <ListGroupItem
            key={id}
            id={id}
            className={`${baseLinkClasses} ${itemClasses}`}
            {...itemProps}
          >
            <Icon className={`${iconSize} ${iconClasses}`} />
            <br />
            {label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}