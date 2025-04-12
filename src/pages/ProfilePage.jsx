import { useEffect, useState } from 'react';
import api from '../services/api.js';
import UpdateProfileForm from '../components/UpdateProfileForm';
import PostList from '../components/Post/PostList.jsx';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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

  if (!user) return <div className="text-center mt-8 text-gray-600">Loading...</div>;

  return (
    <div className=" w-screen p-6 bg-zinc-800  shadow-xl">
      {/* Cover Photo */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <img
          src={user.coverPicture}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="flex justify-center -mt-16">
        <div className="relative w-32 h-32">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-extrabold text-gray-100">{user.username}</h1>
        <p className="text-xl text-gray-100">{user.bio || 'No bio yet'}</p>
      </div>

      <div className="space-y-4 mt-6 text-center text-gray-700">
        <p className="font-semibold text-indigo-100" ><span >Email:</span> {user.email}</p>
        <p className="font-semibold text-indigo-100"><span>Followers:</span> {user.followers?.length || 0}</p>
        <p className="font-semibold text-indigo-100"><span>Following:</span> {user.following?.length || 0}</p>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="w-half  hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors transform hover:scale-105"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/ backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <UpdateProfileForm
              user={user}
              onUpdate={(updatedUser) => {
                setUser(updatedUser);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      <div>
        <PostList userId={user._id}/>
      </div>
    </div>
  );
}

export default ProfilePage;
