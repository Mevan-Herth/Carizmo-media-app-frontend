import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Call the logout API to clear the session
            await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
            setUser(null); // Clear user data in context
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to="/user-profile">User Profile</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        <li>
                            <span>Welcome, {user.name}</span> {/* Assuming 'name' is part of the user object */}
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
