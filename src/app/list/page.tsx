'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
  Container,
  Row,
  Col,
  FormControl,
  Spinner,
  InputGroup,
  Button,
} from 'react-bootstrap';
import ClubCard from '@/components/ClubCard';
import { Club } from '@prisma/client';
import { Search } from 'react-bootstrap-icons';

const ListPage: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUserEmail = session?.user?.email || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchClubs = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clubs');
      }
      const data = await response.json();
      console.log('Clubs', data);
      setFilteredClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
    if (!isSearchActive) {
      setSearchQuery('');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <main
      style={{
        backgroundImage: "url('/uh-blurred.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        fontFamily: "'Montserrat', sans-serif",
        padding: '2rem 0',
      }}
    >
      <Container
        fluid
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          color: '#fff',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Row>
          <Col>
            <h2 className="text-white text-center">Club List</h2>
            <br />
            <div className="d-flex justify-content-center align-items-center mb-4">
              <InputGroup
                style={{
                  transition: 'width 0.3s',
                  width: isSearchActive ? '100%' : '50px',
                  overflow: 'hidden',
                }}
              >
                <Button
                  variant="light"
                  onClick={toggleSearch}
                  style={{
                    borderTopLeftRadius: '25px',
                    borderBottomLeftRadius: '25px',
                    outline: 'none',
                  }}
                >
                  <Search size={20} />
                </Button>
                {isSearchActive && (
                  <FormControl
                    type="text"
                    placeholder="Search clubs by name or interest areas..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3"
                    style={{
                      borderTopRightRadius: '25px',
                      borderBottomRightRadius: '25px',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = 'none')}
                  />
                )}
              </InputGroup>
            </div>
            {isLoading ? (
              <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredClubs.length > 0 ? (
                  filteredClubs.map((club) => (
                    <ClubCard key={club.id} club={club} userEmail={currentUserEmail} />
                  ))
                ) : (
                  <div className="text-center text-white">
                    No clubs found. Try a different search term.
                  </div>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
