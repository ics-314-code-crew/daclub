'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';

const SignOut = () => (
  <main
    style={{
      backgroundImage: "url('/sign-in-bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100%',
      fontFamily: "'Montserrat', sans-serif",
      padding: '2rem 0',
    }}
  >
    <Container
      fluid
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        color: '#fff',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Row className="justify-content-center">
        <Col>
          <Card
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
            }}
          >
            <Card.Body className="text-center">
              <h2 className="text-white mb-4">Do you want to sign out?</h2>
              <Row className="justify-content-center">
                <Col xs={6} md={4} className="mb-3">
                  <Button
                    variant="danger"
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    className="w-100"
                  >
                    Sign Out
                  </Button>
                </Col>
                <Col xs={6} md={4} className="mb-3">
                  <Button variant="secondary" href="/" className="w-100">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </main>
);

export default SignOut;
