'use client';

import { Col, Row, Container } from 'react-bootstrap';

const aboutPage = () => (
  <Container fluid id="landing-page">
    <Row
      id="centerText"
      className="align-items-center justify-content-center"
      style={{ paddingTop: '110px' }}
    >
      <Col xs={8} className="text-center montserrat-font">
        <div id="text-box" className="my-3" style={{ margin: '0 auto', maxWidth: '600px' }}>
          <h1>Welcome to Da Club!</h1>
        </div>
        <div id="text-box" className="my-3" style={{ margin: '0 auto', maxWidth: '600px' }}>
          <h5>
            This website allows students to explore and learn about the different clubs offered at UH Manoa!
            Students can find an assortment of clubs ranging from athletics to art, technology, and so much more.
            Da Club also helps clubs to recruit new members by advertising their clubs using this website.
          </h5>
          <h5>We hope you enjoy your time here and find a club that interests you!</h5>
        </div>
      </Col>
    </Row>
  </Container>
);

export default aboutPage;
