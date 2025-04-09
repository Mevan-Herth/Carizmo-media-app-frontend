import { useEffect, useState } from 'react';
import { getPosts, createComment, getComments } from '../../services/api'; // Add getComments import
import CommentList from '../Comment/CommentList.jsx';
import CommentForm from '../Comment/CommentForm.jsx';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  
  const fetchPosts = async (isMounted) => {
    try {
      setLoading(true);

      const response = await getPosts(page);
      if (!isMounted) return;

      const fetchedPosts = response.data;

      // Deduplicate posts by _id
      const newPosts = fetchedPosts.filter(
        (post) => !posts.some((existingPost) => existingPost._id === post._id)
      );

      // Fetch comments for each new post
      const postsWithComments = await Promise.all(
        newPosts.map(async (post) => {
          try {
            const commentsResponse = await getComments(post._id);
            return { ...post, comments: commentsResponse.data || [] };
          } catch (err) {
            console.error(`Failed to fetch comments for post ${post._id}:`, err);
            return { ...post, comments: [] };
          }
        })
      );

      setPosts((prevPosts) => [...prevPosts, ...postsWithComments]);

      if (fetchedPosts.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };
  // Fetch posts and their comments on mount and page change
  useEffect(() => {
    let isMounted = true;

    sessionStorage.setItem('page',page)
    fetchPosts(isMounted);

    return () => {
      isMounted = false;
    };
  }, [page]);

  // Handle Load More Posts
  const loadMorePosts = () => {
    if (hasMore) {
      let isMounted = true;
      setPage((prevPage) => prevPage + 1);
      
      fetchPosts(isMounted)
      
    }
  };

  // Handle New Comment Submission
  const handleCommentSubmit = async (postId, content) => {
    try {
      const newCommentData = {
        content,
        postId,
      };

      const response = await createComment(newCommentData);
      const newComment = response.data;

      // Update the post with the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), newComment] }
            : post
        )
      );
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  if (loading && page === 1) return <div className="text-center text-gray-500 text-lg">Loading posts...</div>;

  if (error) return <div className="text-center text-red-500 text-lg">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl">
      {posts.length === 0 && <div className="text-center text-gray-500 text-lg">No posts found</div>}

      {posts.map((post, index) => (
        <article
          key={`${post._id}-${index}`}
          className="flex bg-white border border-gray-200 rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200"
        >
          {/* Voting Section (Likes) */}
          <div className="flex flex-col items-center bg-gray-100 p-2 sm:p-3 rounded-l-lg">
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span className="text-gray-700 font-medium my-1">{post.likes || 0}</span>
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Post Content */}
          <div className="flex-1 p-3 sm:p-4">
            {/* Post Metadata */}
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>Posted on: {new Date(post.createdAt).toLocaleString()}</span>
              <span className="mx-2">•</span>
              <span>Updated on: {new Date(post.updatedAt).toLocaleString()}</span>
            </div>

            {/* Post Title */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
              {post.title}
            </h1>

            {/* Post Content */}
            <p className="text-gray-700 mb-4">{post.mainText || 'No content available'}</p>

            {/* Post Images */}
            {post.images?.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comment Section */}
            <div className="mt-4">
              <CommentList comments={post.comments || []} />
              <CommentForm onSubmit={(content) => handleCommentSubmit(post._id, content)} />
            </div>
          </div>
        </article>
      ))}

      {hasMore && !loading && (
        <button
          onClick={loadMorePosts}
          className="block mx-auto mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Load more posts
        </button>
      )}
      {loading && page > 1 && <div className="text-center text-gray-500 text-lg">Loading more posts...</div>}
    </div>
  );
}

export default PostList;