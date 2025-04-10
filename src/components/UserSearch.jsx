import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        setLoading(true);
        axios
          .get(`http://localhost:3000/search?q=${query}`)
          .then((res) => {
            setResults(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Search error:', err);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
      <ul className="mt-4 space-y-2">
        {results.map((user, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-md">
            {user.name || user.username || JSON.stringify(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
