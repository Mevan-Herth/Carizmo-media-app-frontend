import { useState } from 'react';
import PropTypes from 'prop-types';

function PostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Post Title" 
        required
        disabled={loading}
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="What's on your mind?" 
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Post'}
      </button>
    </form>
  );
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default PostForm;