'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './globals.css';
import MiddleMenu from '@/components/MiddleMenu';
import BottomMenu from '@/components/BottomMenu';

/** The Home page. */
const Home = () => (
  <main>
    <Container fluid id="footer">
      <MiddleMenu />
      <BottomMenu />
    </Container>
  </main>
);

export default Home;
