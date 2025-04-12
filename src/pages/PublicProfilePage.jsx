import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileByUsername } from '../services/api';
import PostList from '../components/Post/PostList';

function PublicProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const res = await getProfileByUsername(username);
        setUser(res.data.user);
        setUserPosts(res.data.userPosts || []);
      } catch (err) {
        setError('User not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  if (loading) return <div className="text-center mt-8 text-gray-100">Loading profile...</div>;
  if (error || !user) return <div className="text-center mt-8 text-red-500">{error || 'Error loading profile'}</div>;

  return (
    <div className="w-screen p-6 bg-zinc-800  shadow-xl">
      {/* Cover Photo */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <img
          src={user.coverPicture || '../public/img/default_cover.png'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Image */}
      <div className="flex justify-center -mt-16">
        <div className="relative w-32 h-32">
          <img
            src={user.profilePicture || '../public/img/DEFProfile.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-extrabold text-gray-100">{user.username}</h1>
        <p className="text-xl text-gray-100">{user.bio || 'No bio yet'}</p>
      </div>

      {/* Stats */}
      <div className="space-y-2 mt-6 text-center text-gray-700">
        <p className="font-semibold text-indigo-100"><span >Email:</span> {user.email}</p>
        <p className="font-semibold text-indigo-100"><span >Followers:</span> {user.followers?.length || 0}</p>
        <p className="font-semibold text-indigo-100"><span>Following:</span> {user.following?.length || 0}</p>
      </div>

      {/* User Posts */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-100 text-center">Posts by {user.username}</h2>        
        <PostList posts={user._id} />
       
      </div>
    </div>
  );
}

export default PublicProfilePage;
