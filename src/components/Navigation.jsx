import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { logout } from '../services/api';
import UserSearch from '../components/UserSearch.jsx';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-slate-950 shadow-lg w-screen fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              </svg>
              Home
            </Link>
          </div>
          
          <div>
            {isLoggedIn && <UserSearch />}
          </div>

          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {isLoggedIn && (
              <>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:bg-red-800 px-3 py-2 rounded-lg text-sm font-medium transition duration-300 flex items-center"
                >
                  Menu
                  <svg 
                    className={`w-5 h-5 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-red-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-red-800 px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;