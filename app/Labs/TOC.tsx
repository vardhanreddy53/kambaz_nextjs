import { NavItem, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default function TOC() {
 return (
   <Nav variant="pills">
     <NavItem>
       <Link href="/Labs" passHref legacyBehavior>
         <NavLink>Labs</NavLink>
       </Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/lab1" passHref legacyBehavior>
         <NavLink>Lab 1</NavLink>
       </Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/lab2" passHref legacyBehavior>
         <NavLink active>Lab 2</NavLink>
       </Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/lab3" passHref legacyBehavior>
         <NavLink>Lab 3</NavLink>
       </Link>
     </NavItem>
     <NavItem>
       <Link href="/" passHref legacyBehavior>
         <NavLink>Kambaz(kanbas typo ig)</NavLink>
       </Link>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/vardhanreddy53" target="_blank">My GitHub</NavLink>
     </NavItem>
   </Nav>
 );
}