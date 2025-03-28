import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <>
                    <h2>User Profile</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>

                </>
            ) : (
                <p>Loading profile...</p> 
            )}
        </div>
    );
};

export default UserProfile;
