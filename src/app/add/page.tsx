import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddClubForm from '@/components/AddClubForm';
import StarRating from '@/components/StarRating';

const AddClub = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
    } | null,
  );

  return (
    // Add your form here
    <main>
      <StarRating />
      <AddClubForm />
    </main>
  );
};

export default AddClub;
