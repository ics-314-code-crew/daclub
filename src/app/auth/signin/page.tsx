'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    console.log(email, password);
    // Validate email and password
    if (!email.endsWith('@hawaii.edu')) {
      setError(`Invalid email: ${email}... Email must end with '@hawaii.edu'`);
      return;
    }
    if (!password) {
      setError('Password cannot be empty');
      return;
    }
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      if (result.error === 'No user found with the provided email') {
        setError('No user found with the provided email');
      } else if (result.error === 'Invalid password') {
        setError('Invalid password for the provided email');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError(null);
      window.location.href = '/';
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
                {error && <Alert variant="danger">{error}</Alert>}
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
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
