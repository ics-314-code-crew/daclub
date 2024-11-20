import { getServerSession } from 'next-auth';
// import { notFound } from 'next/navigation';
// import { Club } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
// import { prisma } from '@/lib/prisma';

export default async function EditClubPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  console.log(params);
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  return (
    <main>
      Placeholder for EditClubForm
    </main>
  );
}
