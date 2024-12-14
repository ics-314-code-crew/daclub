import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import ClubCardAdmin from '@/components/ClubCardAdmin';
import authOptions from '@/lib/authOptions';
import { Club } from '@prisma/client';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { id: string; email: string; role: string };
    } | null,
  );

  const clubs: Club[] = await prisma.club.findMany({});

  const clubsWithLinks = clubs.map((club) => ({
    ...club,
    link: club.website || 'https://manoa.hawaii.edu/',
  }));

  return (
    <main
      style={{
        backgroundImage: "url('/uh-blurred.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        fontFamily: "'Montserrat', sans-serif",
        padding: '2rem 0',
      }}
    >
      <Container
        fluid
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          color: '#fff',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Row>
          <Col>
            <h2 className="text-white text-center">Manage Clubs (Admin)</h2>
            <br />
            <Row xs={1} md={2} lg={3} className="g-4">
              {clubsWithLinks.map((club) => (
                <ClubCardAdmin key={club.id} club={club} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
