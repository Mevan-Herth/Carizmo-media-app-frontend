import { useEffect, useState } from 'react';
import { api } from '../services/api';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio || 'No bio yet'}</p>
      <img src={user.profilePicture} alt="Profile" style={{ maxWidth: '200px' }} />
    </div>
  );
}

export default ProfilePage;