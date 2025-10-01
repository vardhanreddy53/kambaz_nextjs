import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";


export default function BootstrapForm() {
  return (
    <Container>
      <div id="wd-css-styling-dropdowns">
        <h3>Country</h3>
        <Form.Select defaultValue="India">
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>India</option>
          <option>Germany</option>
        </Form.Select>
      </div>

      <div id="wd-css-styling-switches">
        <h3>Preferences</h3>
        <Form.Check type="switch" id="news-sub" label="Subscribe to newsletter" defaultChecked />
        <Form.Check type="switch" id="dark-mode" label="Enable dark mode" />
        <Form.Check type="switch" id="notifications" label="Enable notifications" disabled />
      </div>

      <div id="wd-css-styling-range-and-sliders">
        <h3>Age</h3>
        <div className="mb-3">
          <Form.Label>21</Form.Label>
          <Form.Range min="0" max="100" step="1" defaultValue={21} />
        </div>
      </div>

      <div id="wd-css-styling-addons">
  <h3>Salary Expectation</h3>
  <InputGroup className="mb-3">
    <span className="input-group-text">$</span>
    <span className="input-group-text">0.00</span>
    <Form.Control defaultValue="50000" />
  </InputGroup>
  <InputGroup>
    <Form.Control defaultValue="75000" />
    <span className="input-group-text">$</span>
    <span className="input-group-text">0.00</span>
  </InputGroup>
</div>

      <div id="wd-css-responsive-forms-1">
        <h3>Profile Information</h3>
        <Row className="mb-3">
          <Form.Label column sm={2}>Full Name</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue="Vardhan Reddy" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="vardhan@neu.com" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Bio</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              defaultValue="I am Vardhan Reddy, a 21-year-old from India interested in software development."
            />
          </Col>
        </Row>
      </div>

      <div id="wd-css-responsive-forms-2">
        <h3>Account Settings</h3>
        <Form>
          <Row className="mb-3">
            <Form.Label column sm={2}>Username</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" defaultValue="vardhanreddy" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Enter new password" />
            </Col>
          </Row>

          <fieldset>
            <Row className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" label="Male" name="gender" defaultChecked />
                <Form.Check type="radio" label="Female" name="gender" />
                <Form.Check type="radio" label="Prefer not to say" name="gender" />
              </Col>
            </Row>
          </fieldset>

          <Row className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Button type="submit">Update Profile</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}