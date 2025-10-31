"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

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
  accountReducer: {
    currentUser: User | null;
  };
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
  
  return (
    <div id="wd-account-navigation" className="mt-3">
      <ListGroup>
        {links.map((link) => (
          <ListGroup.Item 
            key={link}
            as={Link} 
            href={`/Account/${link}`}
            active={pathname.includes(link.toLowerCase())}
            className="border-0"
          >
            {link}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}