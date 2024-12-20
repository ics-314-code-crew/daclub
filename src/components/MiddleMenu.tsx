'use client';

import { Col, Row } from 'react-bootstrap';

const MiddleMenu = () => (
  <Row
    id="centerText"
    className="align-items-center justify-content-center"
    style={{ paddingTop: '110px', paddingBottom: '50px' }}
  >
    <Col xs={10} md={8} className="text-center montserrat-font">
      <div id="text-box" className="my-3">
        <h1>Welcome to Da Club!</h1>
      </div>
      <div id="text-box" className="my-3">
        <h5>
          This website allows students to explore and learn about the different clubs offered at UH Manoa! Students
          can find an assortment of clubs ranging from athletics to art, technology, and so much more. Da Club also
          helps clubs to recruit new members by advertising their clubs using this website.
        </h5>
        <h5>We hope you enjoy your time here and find a club that interests you!</h5>
      </div>
    </Col>
  </Row>
);

export default MiddleMenu;
