"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function BootstrapLists() {
  return (
    <div id="wd-css-styling-lists">
      <h2>Favorite Telugu Movies</h2>
      <ListGroup>
        <ListGroupItem active={true}>Darling</ListGroupItem>
        <ListGroupItem>Bahubali</ListGroupItem>
        <ListGroupItem>RRR</ListGroupItem>
        <ListGroupItem>Pushpa</ListGroupItem>
        <ListGroupItem disabled>KGF Chapter 2</ListGroupItem>
      </ListGroup>

      <div id="wd-css-hyperlink-list">
        <h3>Favorite Books</h3>
        <ListGroup>
          <ListGroupItem
            as="a"
            action
            active
            href="https://en.wikipedia.org/wiki/Rich_Dad_Poor_Dad"
          >
            Rich Dad Poor Dad
          </ListGroupItem>
          <ListGroupItem
            as="a"
            action
            href="https://en.wikipedia.org/wiki/Almanack_of_Naval_Ravikant"
          >
            Almanack of Naval Ravikant
          </ListGroupItem>
          <ListGroupItem
            as="a"
            action
            href="https://en.wikipedia.org/wiki/Atomic_Habits"
          >
            Atomic Habits
          </ListGroupItem>
          <ListGroupItem
            as="a"
            action
            href="https://en.wikipedia.org/wiki/Surrounded_by_Idiots"
          >
            Surrounded by Idiots
          </ListGroupItem>
          <ListGroupItem
            as="a"
            action
            href="https://en.wikipedia.org/wiki/The_Hard_Thing_About_Hard_Things"
          >
            Hard Thing About Hard Things
          </ListGroupItem>
          <ListGroupItem action onClick={() => alert("New book added")}>
            Add another book
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}