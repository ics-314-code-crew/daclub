import { useState, useEffect, useCallback } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { Club } from '@prisma/client';
import Notification from './Notification'; // Import the Notification component

type SearchProps = {
  onResults: (clubs: Club[]) => void;
  onLoading?: (loading: boolean) => void;
};

const Search: React.FC<SearchProps> = ({ onResults, onLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchClubs = useCallback(
    async (query: string) => {
      if (onLoading) onLoading(true);
      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await response.json();
        onResults(data);
        setNotification('Clubs fetched successfully!');
      } catch (error) {
        onResults([]);
        setNotification('Failed to fetch clubs');
      } finally {
        if (onLoading) onLoading(false);
      }
    },
    [onResults, onLoading],
  );

  useEffect(() => {
    fetchClubs(searchQuery);
  }, [fetchClubs, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
    if (!isSearchActive) {
      setSearchQuery('');
    }
  };

  return (
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
          <SearchIcon size={20} />
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
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default Search;
