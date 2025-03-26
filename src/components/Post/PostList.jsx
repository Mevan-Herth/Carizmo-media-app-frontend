import PostItem from './PostItem';

function PostList({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;