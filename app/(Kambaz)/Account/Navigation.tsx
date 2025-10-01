"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  return (
    <div id="wd-account-navigation" className="mt-3">
      <ListGroup>
        <ListGroup.Item 
          as={Link} 
          href="/Account/Signin"
          active={pathname === "/Account/Signin"}
          className="border-0"
        >
          Signin
        </ListGroup.Item>
        <ListGroup.Item 
          as={Link} 
          href="/Account/Signup"
          active={pathname === "/Account/Signup"}
          className="border-0"
        >
          Signup
        </ListGroup.Item>
        <ListGroup.Item 
          as={Link} 
          href="/Account/Profile"
          active={pathname === "/Account/Profile"}
          className="border-0"
        >
          Profile
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}