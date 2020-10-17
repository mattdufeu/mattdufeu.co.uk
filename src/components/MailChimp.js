import React, { useState } from "react";

import addToMailchimp from "gatsby-plugin-mailchimp";

import { Button, Card, Container, Row, Form } from "react-bootstrap";

const MailChimp = () => {
  const [state, setState] = useState({
    email: "",
  });

  const handleEmailChange = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    addToMailchimp("state.email")
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.error("Something went wrong");
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MailChimp;
