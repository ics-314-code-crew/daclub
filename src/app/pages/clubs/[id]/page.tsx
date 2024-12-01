import { prisma } from '@/lib/prisma';
import { Container, Image, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

type ClubPageProps = {
  params: { id: string }; // Ensure `params` type is correctly defined
};

const ClubPage = async ({ params }: ClubPageProps) => {
  const { id } = params;

  const clubId = parseInt(id, 10);

  if (Number.isNaN(clubId)) {
    return <h1>Invalid club ID</h1>;
  }

  // Fetch the club data from the database
  const club = await prisma.club.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      meetingTime: true,
      location: true,
    },
  });

  // Handle case where club is not found
  if (!club) {
    return <h1>Club not found</h1>;
  }

  console.log('club.logo in ClubPage:', club.logo);

  // Render the club details if found
  return (
    <Container>
      <Navbar>
        <Link href="/list">
          <ArrowLeftCircle width={50} height={50} className="pt-1" />
        </Link>
        <h2 className="text-center w-100">{club.name}</h2>
      </Navbar>
      <div className="float-start bg-dark p-3 d-inline-block rounded" id="image-box">
        <Image
          src={`/${club.logo}`}
          width={250}
          height={250}
          className="d-block float-start"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="text-container ms-4">
        <p>Meeting Time: {club.meetingTime}</p>
        <p>Location: {club.location}</p>
        <p>{club.description}</p>
      </div>
    </Container>
  );
};

export default ClubPage;
