import React, { useState, useEffect } from 'react';
import { getSearchResults } from '../services/api'
import { Link } from 'react-router-dom';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        setLoading(true);
        setIsDropdownOpen(true);

        getSearchResults(query)
          .then((res) => {

            const users = res.data?.data || [];
            setResults(Array.isArray(users) ? users : [users]);
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              // alert('Session expired. Please log in again.');
              console.error('Search error:', err);
              setResults([]);
              // window.location.href = '/login';
            }
          })
          .finally(() => {
            setLoading(false);
          })


      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // const handleResultClick = (username) => {
  //   window.location.href = `/profile/${username}`;
  //   setIsDropdownOpen(false);
  //   setQuery('');
  // };

  return (
    <div className="relative w-400 max-w-xs md:max-w-sm">
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 bg-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      placeholder="Search users..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => results.length > 0 && setIsDropdownOpen(true)}
      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
    />

    {isDropdownOpen && results.length > 0 && (
      <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
        {results.map((user) => (
          <li
            key={user._id}
            className="px-4 py-2 hover:bg-blue-100 text-sm cursor-pointer"
            onClick={() => handleResultClick(user.username)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    )}

    {isDropdownOpen && !loading && results.length === 0 && query && (
      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg px-4 py-2 text-sm text-gray-500">
        No users found for "{query}"
      </div>
    )}
  </div>
  );
};

export default UserSearch;
