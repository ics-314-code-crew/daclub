import { prisma } from '@/lib/prisma';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

type ClubPageProps = {
  params: { id: string }; // Ensure `params` type is correctly defined
};

const ClubPage = async ({ params }: ClubPageProps) => {
  const { id } = params;

  // Fetch the club data from the database
  const club = await prisma.club.findUnique({
    where: { id: Number(id) },
  });

  // Handle case where club is not found
  if (!club) {
    return <h1>Club not found</h1>;
  }

  // Render the club details if found
  return (
    <div>
      <Link href="/list">
        <ArrowLeftCircle />
      </Link>
      <h1>{club.name}</h1>
      <Image src={club.logo} />
      <p>{club.description}</p>
    </div>
  );
};

export default ClubPage;
