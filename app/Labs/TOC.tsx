"use client"
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function TOC() {
  const pathname = usePathname();
 return (
  <div>
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/Labs" as={Link}  className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>Labs</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>Lab 1</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>Lab 2</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>Lab 3(Bootstrapcss)</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/Labs/lab4" as={Link} className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}>Lab 4</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>Kambaz</NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/vardhanreddy53">My GitHub</NavLink>
     </NavItem>
   </Nav>
   </div>
);}

