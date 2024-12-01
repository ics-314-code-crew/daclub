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

  const clubs: Club[] = await prisma.club.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      website: true,
      description: true,
      meetingTime: true,
      location: true,
      contactEmail: true,
      admins: true,
      startDate: true,
      expirationDate: true,
      interestAreas: true,
    },
  });
  const clubsWithLinks = clubs.map((club) => ({
    ...club,
    link: club.website || 'https://manoa.hawaii.edu/',
  }));
  return (
    <main id="landing-page">
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Club List</h1>
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
