import { Button, Card, CardBody, CardImg, CardText, CardTitle, Nav,NavItem,NavLink } from "react-bootstrap";

export default function BootstrapNavigation(){
    return(
 <div id="wd-css-navigating-with-tabs">
  <h2>Tabs</h2>
  <Nav variant="tabs">
    <NavItem>
      <NavLink href="#/Labs/lab3/Active">Active</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/Labs/lab3/Link">Link 1</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/Labs/lab3/Link2">Link 2</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/Labs/lab3/Disabled" disabled>Disabled</NavLink>
    </NavItem>
  </Nav>
  <div id="wd-css-navigating-with-cards">
  <h2>
    Cards
  </h2>
  <Card style={{ width: "18rem" }}>
    <CardImg variant="top" src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
    <CardBody>
      <CardTitle>Stacking Starship</CardTitle>
      <CardText>
        Stacking the most powerful rocket in history. Mars or bust!
      </CardText>
      <Button variant="primary">Boldly Go</Button>
    </CardBody>
  </Card>
</div>
</div>


    )
}