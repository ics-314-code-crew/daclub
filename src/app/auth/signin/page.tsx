'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      uhid: { value: string };
      password: { value: string };
    };
    const uhid = target.uhid.value;
    const password = target.password.value;

    // Validate the UHID
    if (!/^\d{1,8}$/.test(uhid)) {
      console.error('UHID must be an integer between 0 and 99999999');
      return;
    }
    const result = await signIn('credentials', {
      callbackUrl: '/list',
      uhid,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>UH ID</Form.Label>
                    <Form.Control
                      name="uhid"
                      type="text"
                      pattern="\d{1,8}"
                      placeholder="UH ID"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Signin
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
