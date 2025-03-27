import { useState } from 'react';

function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Add a comment..." 
      />
      <button type="submit">Comment</button>
    </form>
  );
}

export default CommentForm;