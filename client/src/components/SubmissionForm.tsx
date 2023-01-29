import "./SubmissionForm.css";

import { createSubmission } from "../api/SubmissionsApi";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { FormEvent, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const SubmissionForm = () => {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = createSubmission({
      companyName: event.currentTarget.companyName.value,
      physicalAddress: event.currentTarget.physicalAddress.value,
      annualRevenue: event.currentTarget.annualRevenue.value,
    });
    response
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Could not create submission");
        navigate("/");
      });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Label>PLEASE FILL IN THE FOLLOWING FIELDS</Form.Label>
        <Row xs={4}>
          <Col>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="annualRevenue">
              <Form.Label>Annual Revenue</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row xs={4}>
          <Col>
            <Form.Group controlId="physicalAddress">
              <Form.Label>Physical Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="additionalData">
              <p className="match-form-label"></p>
              <Form.Control
                type="text"
                placeholder="Floor, Suit, Unit tec (Optional)"
              />
            </Form.Group>
          </Col>
        </Row>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-end fixed-bottom mb-4 me-4"
        >
          <Link to="..">
            <Button variant="outline-secondary">BACK</Button>
          </Link>
          {/* <Link to="/"> */}
          <Button variant="primary" type="submit">
            SAVE AND CONTINUE
          </Button>
          {/* </Link> */}
        </Stack>
      </Form>
    </div>
  );
};

export default SubmissionForm;
