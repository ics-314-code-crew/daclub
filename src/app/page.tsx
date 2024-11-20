import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './globals.css';
import MiddleMenu from '@/components/MiddleMenu';

/** The Home page. */
const Home = () => (
  <main>
    <Container fluid id="footer">
      <MiddleMenu />
    </Container>
  </main>
);

export default Home;
