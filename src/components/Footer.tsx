import Link from 'next/link';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer style={{ backgroundColor: 'green' }} className="mt-auto py-3">
    <Container>
      <Col className="text-center">
        Department of Information and Computer Sciences
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <Link href="http://ics-software-engineering.github.io/nextjs-application-template">Template Home Page</Link>
      </Col>
    </Container>
  </footer>
);

export default Footer;
