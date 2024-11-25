'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Container, Row } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container id="signout-page" fluid className="py-3">
    <Col className="text-center py-3">
      <h2>Do you want to sign out?</h2>
      <Row>
        <Col xs={4} />
        <Col>
          <Button variant="danger" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Sign Out
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" href="/">
            Cancel
          </Button>
        </Col>
        <Col xs={4} />
      </Row>
    </Col>
  </Container>
);

export default SignOut;
