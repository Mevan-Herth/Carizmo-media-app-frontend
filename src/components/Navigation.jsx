import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { logout } from '../services/api';
import UserSearch from '../components/UserSearch.jsx';
import { useUser } from './useUser.jsx'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = useUser();

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
        <div className="flex justify-center items-center h-16 border relative">

          <div className="flex space-x-4">
            <Link
              to="/"
              className=" text-white self-start absolute top-[0.4rem] left-0 hover:bg-red-800 px-3 py-2 rounded-md 
              text-lg font-medium transition duration-300 flex items-center"
            >
              Home
            </Link>
          </div>


          <div className="border">
            {isLoggedIn && <UserSearch />}
          </div>


          <div className="flex items-center absolute right-0 self-end" ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                {user ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-13 h-13 rounded-full  shadow-lg object-cover"
                  >
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full"
                    />
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg bg-gray-400 animate-pulse"></div>
                )}

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 top-full w-40 bg-white rounded-md shadow-lg py-1 z-40">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
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