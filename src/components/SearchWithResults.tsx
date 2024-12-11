'use client';

import { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import ClubCard from '@/components/ClubCard';
import Search from '@/components/Search';
import Notification from '@/components/Notification';
import { Club } from '@prisma/client';

type SearchWithResultsProps = {
  currentUserEmail: string;
};

const SearchWithResults: React.FC<SearchWithResultsProps> = ({ currentUserEmail }) => {
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleResults = (clubs: Club[]) => {
    setFilteredClubs(clubs);
    setIsLoading(false);
    if (clubs.length > 0) {
      setNotification('Clubs found successfully!');
    } else {
      setNotification('No clubs found. Try a different search term.');
    }
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      <div className="text-center text-white">No clubs found. Try a different search term.</div>
      <Search onResults={handleResults} onLoading={handleLoading} />
      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club) => (
              <Col key={club.id} className="mb-4">
                <ClubCard club={club} userEmail={currentUserEmail} />
              </Col>
            ))
          ) : (
            <div className="text-center text-white">No clubs found. Try a different search term.</div>
          )}
        </Row>
      )}
    </>
  );
};

export default SearchWithResults;
