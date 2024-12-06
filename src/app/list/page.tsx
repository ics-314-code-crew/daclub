import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
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

  const userEmail = session?.user.email || '';

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
                <ClubCard key={club.id} club={club} userEmail={userEmail} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
