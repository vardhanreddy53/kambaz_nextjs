"use client";
import { ListGroup } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <ListGroup>
      <Link href="/Labs" style={{ textDecoration: 'none' }}>
        <ListGroup.Item action active={pathname === "/Labs"}>
          Labs
        </ListGroup.Item>
      </Link>
      <Link href="/Labs/lab1" style={{ textDecoration: 'none' }}>
        <ListGroup.Item action active={pathname === "/Labs/lab1"}>
          Lab 1
        </ListGroup.Item>
      </Link>
      <Link href="/Labs/lab2" style={{ textDecoration: 'none' }}>
        <ListGroup.Item action active={pathname === "/Labs/lab2"}>
          Lab 2
        </ListGroup.Item>
      </Link>
      <Link href="/Labs/lab3" style={{ textDecoration: 'none' }}>
        <ListGroup.Item action active={pathname === "/Labs/lab3"}>
          Lab 3
        </ListGroup.Item>
      </Link>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <ListGroup.Item action>
          Kambaz(kanbas typo ig)
        </ListGroup.Item>
      </Link>
      <ListGroup.Item action href="https://github.com/vardhanreddy53" target="_blank">
        My GitHub
      </ListGroup.Item>
    </ListGroup>
  );
}