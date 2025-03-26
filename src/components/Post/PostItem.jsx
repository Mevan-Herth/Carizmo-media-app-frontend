import { Link } from 'react-router-dom';

function PostItem({ post }) {
  return (
    <div>
      <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.mainText}</p>
    </div>
  );
}

export default PostItem;