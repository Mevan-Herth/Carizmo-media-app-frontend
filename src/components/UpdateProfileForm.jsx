import { useState } from 'react';
import { updateProfile } from '../services/api';
import { useNavigate } from "react-router";

function UpdateProfileForm({ user, onUpdate }) {
    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
    });
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setProfilePicture(e.target.files[0]);
        } else {
            setCoverPicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('username', formData.username);
        fd.append('email', formData.email);
        fd.append('bio', formData.bio);
        if (profilePicture) fd.append('profilePicture', profilePicture);
        if (coverPicture) fd.append('coverPicture', coverPicture);

        try {
            setLoading(true);
            const res = await updateProfile(user._id, fd);
            onUpdate(res.data.data); // Update parent state
            navigate("/profile");
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            encType="multipart/form-data"
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
        >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Update Profile
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Username"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Email"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Profile Bio:</label>
                    <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Write a short bio"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Profile Picture:</label>
                    <input 
                        type="file" 
                        name="profilePicture" 
                        onChange={handleFileChange}
                        className="w-full file:px-4 file:py-3 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Cover Picture:</label>
                    <input 
                        type="file" 
                        name="coverPicture" 
                        onChange={handleFileChange}
                        className="w-full file:px-4 file:py-3 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition-all"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold transition-all 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'}`}
            >
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
}

export default UpdateProfileForm;
