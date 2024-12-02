'use client';

import '@/app/globals.css'; // Ensure you import the CSS file
import MiddleMenu from '@/components/MiddleMenu';
import { Container } from 'react-bootstrap';

const aboutPage = () => (
  <Container fluid id="landing-page">
    <MiddleMenu />
  </Container>
);

export default aboutPage;
