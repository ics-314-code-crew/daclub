import { prisma } from '@/lib/prisma';
import { Club } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

type ClubPageProps = {
  club: Club | null;
};

const ClubPage = ({ club }: ClubPageProps) => {
  if (!club) {
    return <h1>Club not found</h1>;
  }
  console.log('Id is:', club.id);
  console.log('Image URL:', club.logo);
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

export const getServerSideProps: GetServerSideProps<ClubPageProps> = async (context) => {
  const { id } = context.params!;
  const club = await prisma.club.findUnique({
    where: { id: Number(id) },
  });
  if (!club) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      club,
    },
  };
};

export default ClubPage;