import { useState } from 'react';
import PropTypes from 'prop-types';

function PostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);  // For storing the selected image file

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Create a FormData object to handle file upload along with title and content
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('postImages', image); // Append image if it is selected
    }

    onSubmit(formData);
    setTitle('');
    setContent('');
    setImage(null);  // Clear the image after submitting
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create a Post</h2>
      
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Post Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the post title"
          required
          disabled={loading}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Post Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
          disabled={loading}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Image (optional)
        </label>
        <input
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*" // Restrict file types to images only
          disabled={loading}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-bold transition-transform 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'}`}
      >
        {loading ? 'Submitting...' : 'Submit Post'}
      </button>
    </form>
  );
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default PostForm;
