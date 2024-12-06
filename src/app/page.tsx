'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './globals.css';
import BottomMenu from '@/components/BottomMenu';

/** The Home page. */
const Home = () => (
  <main>
    <Container fluid id="footer">
      <BottomMenu />
    </Container>
  </main>
);

export default Home;
