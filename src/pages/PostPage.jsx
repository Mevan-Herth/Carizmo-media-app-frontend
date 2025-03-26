import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/Comment/CommentList';
import CommentForm from '../components/Comment/CommentForm';
import { getPost, getComments, createComment } from '../services/api';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await getPost(id);
      const commentsResponse = await getComments(id);
      setPost(postResponse.data.post);
      setComments(commentsResponse.data);
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (content) => {
    const response = await createComment({ postId: id, content });
    setComments([...comments, response.data]);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.mainText}</p>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
}

export default PostPage;