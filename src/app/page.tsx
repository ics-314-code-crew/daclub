import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" className="py-3">
      <Row className="align-middle text-center">
        <Col>
          <h1>Welcome to Da Club!</h1>
          <h5>
            This website allows students to explore and learn about the different clubs offered at UH Manoa!
            Students can find an assortment of clubs ranging from athletics to art and so much more.
            We hope this website will help you find a club that interests you and that you will enjoy!
          </h5>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
