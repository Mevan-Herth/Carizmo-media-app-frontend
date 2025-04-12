import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../services/api';
import UserSearch from '../components/UserSearch.jsx';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-slate-950 shadow-lg w-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profile
              </Link>
            ) : null}
          </div>
          <div >
            {isLoggedIn ? (<div >
              <UserSearch />
            </div>) :
              null}
          </div>


          <div className="flex space-x-4">

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white  hover:bg-red-800 px-4 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center shadow hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
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