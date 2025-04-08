import { useState } from 'react';

function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;