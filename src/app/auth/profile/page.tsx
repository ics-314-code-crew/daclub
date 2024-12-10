'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Container, Image } from 'react-bootstrap';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || '';
  const lastName = session?.user?.name?.split(' ')[1] || '';
  const email = session?.user?.email || '';
  const profile = session?.user?.profileImage || '/default-image.png';
  console.log('session', session);
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  return (
    <Container>
      <h1 className="text-center mt-5">Profile</h1>
      <div className="profile-div">
        <div className="profile-image-info mt-5 mx-5">
          <Image
            src={profile}
            alt="Profile Picture"
            roundedCircle
            width={250}
            height={250}
            className="profile-image mb-5 mx-5"
          />
        </div>
        <div className="profile-info mt-5 mx-5">
          <div className="text-size">
            <strong>First Name: </strong>
            <br />
            <span>{firstName}</span>
          </div>
          <div className="text-size">
            <strong>Last Name: </strong>
            <br />
            <span>{lastName}</span>
          </div>
          <div className="text-size">
            <strong>Email Address: </strong>
            <br />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
