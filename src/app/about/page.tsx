'use client';

import { Container, Card, Row, Col } from 'react-bootstrap';

const AboutPage = () => (
  <Container
    fluid
    className="d-flex flex-column justify-content-center align-items-center"
    style={{
      backgroundImage: "url('/uh-blurred.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100%',
    }}
  >
    <Container
      fluid
      className="text-center bg-dark text-white py-5"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '10px',
        maxWidth: '1200px',
      }}
    >
      <Row className="justify-content-center">
        <Col>
          <h1 className="mb-4" style={{ fontWeight: 700, fontSize: '2rem' }}>
            Welcome to Da Club!
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10}>
          <p className="lead">
            This portal empowers students to explore and learn about the
            different clubs offered at UH Manoa. Students can find an assortment
            of clubs ranging from athletics to art, technology, and so much
            more.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8}>
          <Card
            className="shadow-lg mx-auto"
            style={{ borderRadius: '10px', width: '100%' }}
          >
            <Card.Body>
              <h5 className="mb-2">
                Department of Information and Computer Sciences
              </h5>
              <Row>
                <Col>University of Hawaii</Col>
              </Row>
              <Row>
                <Col>Honolulu, HI 96822</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default AboutPage;
