'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import './globals.css';
import BottomMenu from '@/components/BottomMenu';

/** The Home page. */
const Home = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/about');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Container fluid>
        <BottomMenu />
      </Container>
    </main>
  );
};

export default Home;
