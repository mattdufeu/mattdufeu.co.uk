import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import addToMailchimp from "gatsby-plugin-mailchimp";

import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";

const MailChimp = () => {
  const [state, setState] = useState({
    email: "",
    successfulSubscribe: false,
    networkError: false,
    networkErrorMessage: ""
  });

  const handleEmailChange = (e) => {
    setState({
      ...state,
      email: e.target.value
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    addToMailchimp(state.email).then((result) => {
      if (result.result === "error") {
        setState({
          ...state,
          successfulSubscribe: false,
          networkError: true,
          networkErrorMessage: result.msg.split(". ")[0] // hack
        });
      } else {
        setState({
          ...state,
          successfulSubscribe: true,
          networkError: false,
          networkErrorMessage: ""
        });
      }
    });
  };

  return (
    <Container>
      <Card style={{ boxShadow: "0 2px 15px 0 rgba(210,214,220,0.5)" }}>
        <Card.Body style={{ padding: "0.75rem 0.75rem 0.25rem 0.75rem" }}>
          <Row>
            <div style={{ margin: "auto" }}>
              <Form inline onSubmit={_handleSubmit}>
                <Form.Group>
                  <Form.Label className="mb-2 mr-sm-2" htmlFor="email">
                    Subscribe to my monthly newsletter
                  </Form.Label>
                  <Form.Control
                    name="email"
                    id="email"
                    className="mb-2 mr-sm-2"
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                  />
                  <Button type="submit" className="mb-2">
                    Subscribe
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Row>
          {state.successfulSubscribe && (
            <Row>
              <Col>
                <Alert variant="success">
                  Thank you for subscribing to my newsletter.
                </Alert>
              </Col>
            </Row>
          )}
          {state.networkError && (
            <Row>
              <Col>
                <Alert variant="warning">
                  Subscription failed: {state.networkErrorMessage}
                </Alert>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MailChimp;
