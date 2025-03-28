import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users/profile", {
                    withCredentials: true, // Include credentials (cookies) with the request
                });
                setUser(response.data); // Set user data in state
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null); // If error occurs (e.g., not logged in), set user to null
            }
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
