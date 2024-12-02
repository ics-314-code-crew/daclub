'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ResultsPage = () => {
  const router = useRouter();
  const { query } = router.query;
  interface Result {
    id: string;
    name: string;
  }

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Fetch search results based on the query
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Results Page</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
