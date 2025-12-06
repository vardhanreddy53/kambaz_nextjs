"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavLink } from "react-bootstrap";
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
      <Nav variant="pills" className="flex-column">
        {links.map((link) => (
          <NavLink 
            key={link}
            as={Link} 
            href={`/Account/${link}`}
            active={pathname.includes(link.toLowerCase())}
          >
            {link}
          </NavLink>
        ))}
        {currentUser && currentUser.role === "ADMIN" && (
          <NavLink 
            as={Link} 
            href="/Account/Users"
            active={pathname.endsWith('Users')}
          >
            Users
          </NavLink>
        )}
      </Nav>

  );
}