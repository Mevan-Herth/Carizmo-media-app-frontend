import { useState } from 'react';
import PropTypes from 'prop-types';

function PostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]); 
  const [previews, setPreviews] = useState([]);
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);


    // Generate previews
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Create a FormData object to handle file upload along with title and content
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    image.forEach((image) => {
      formData.append('postImages', image);
    });

    onSubmit(formData);
    setTitle('');
    setContent('');
    setImage(null);  // Clear the image after submitting
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto  bg-white p-6 rounded-lg shadow-md space-y-6 "
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

         {/* Image Upload (Multiple) */}
         <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Images (Max 5)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}

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
