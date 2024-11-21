import { getServerSession } from 'next-auth';
// import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ClubCard from '@/components/ClubCard';
import { Club } from '@prisma/client';

/** Render a list of clubs for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const clubs: Club[] = await prisma.club.findMany({});
  return (
    <main id="landing-page">
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '300px',
        }}
      >
        Placeholder for the club list.
      </div>
    </main>
  );
};

export default ListPage;
