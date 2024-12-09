'use client';

import { Col, Container, Row, Nav } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white py-4">
    <Container>
      <Row className="justify-content-center text-center">
        <Col xs={12} md={4}>
          <h5>About Us</h5>
          <p>
            Student-developed RIO management portal by Jake Dickinson, Dodie
            Madriaga, Eden K. Parungao, Jayden Sagayaga, and Nathan Chee for UH
            Manoa&apos;s ICS 314.
          </p>
        </Col>
        <Col xs={12} md={4}>
          <h5>Contact Information</h5>
          <Nav className="flex-column">
            <Nav.Item>Department of Information and Computer Sciences</Nav.Item>
            <Nav.Item>University of Hawaii</Nav.Item>
            <Nav.Item>Honolulu, HI 96822</Nav.Item>
          </Nav>
        </Col>
        <Col xs={12} md={4}>
          <h5>Developed with Next.js</h5>
          <Nav className="flex-column">
            <Nav.Link
              href="https://github.com/ics-314-code-crew"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Organization on GitHub
            </Nav.Link>
            <Nav.Link
              href="http://ics-software-engineering.github.io/nextjs-application-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              Template Home Page
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
      <hr className="my-4 border-light" />
      <Row className="justify-content-center text-center">
        <Col xs="auto">
          <p className="mb-0">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            Da Club. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
