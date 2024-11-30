import { prisma } from '@/lib/prisma';
import { Image } from 'react-bootstrap';
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
    },
  });

  // Handle case where club is not found
  if (!club) {
    return <h1>Club not found</h1>;
  }

  console.log('club.logo in ClubPage:', club.logo);

  // Render the club details if found
  return (
    <div>
      <h1>{club.name}</h1>
      <Link href="/list">
        <ArrowLeftCircle />
      </Link>
      <Image src={`/${club.logo}`} width={100} height={100} className="club-image mx-auto d-block" />
      <p>{club.description}</p>
    </div>
  );
};

export default ClubPage;
