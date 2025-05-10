import { useEffect, useState } from 'react';
import { getUserPosts, getComments } from '../../services/api';

function UserPosts({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndices, setCurrentIndices] = useState({});

  const fetchUserPosts = async () => {
    try {
      setLoading(true);

      if (!currentUser?._id) {
        throw new Error('User information not available');
      }

      const response = await getUserPosts(currentUser._id, page);
      const fetchedPosts = response.data || [];

      const newPosts = fetchedPosts.filter(
        post => !posts.some(existingPost => existingPost._id === post._id)
      );

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

      setPosts(prev => [...prev, ...postsWithComments]);
      setHasMore(fetchedPosts.length > 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchUserPosts();
    }
  }, [page, currentUser?._id]);

  const loadMorePosts = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (loading && page === 1)
    return <div className="text-center text-gray-500 text-lg">Loading posts...</div>;
  if (error)
    return <div className="text-center text-red-500 text-lg">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Your Posts</h2>

      {posts.length === 0 && !loading && (
        <div className="text-center text-gray-500">You haven't created any posts yet</div>
      )}

      {posts.map((post, index) => (
        <article
          key={`${post._id}-${index}`}
          className="flex bg-white border border-gray-200 rounded-lg mb-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex flex-col items-center bg-gray-100 p-2 sm:p-3 rounded-l-lg">
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <span className="text-gray-700 font-medium my-1">{post.likes || 0}</span>
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-3 sm:p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>Posted on: {new Date(post.createdAt).toLocaleString()}</span>
              <span className="mx-2">•</span>
              <span>Updated on: {new Date(post.updatedAt).toLocaleString()}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
              {post.title}
            </h1>

            <p className="text-gray-700 mb-4">{post.mainText || 'No content available'}</p>

            {post.images?.length > 0 && (
              <div className="mb-4 relative">
                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${(currentIndices[post._id] || 0) * 100}%)` }}
                  >
                    {post.images.map((image, i) => (
                      <div key={i} className="w-full flex-shrink-0">
                        <img
                          src={image}
                          alt={`Post image ${i + 1}`}
                          className="w-full h-64 sm:h-96 object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {post.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentIndices(prev => ({
                            ...prev,
                            [post._id]: Math.max((prev[post._id] || 0) - 1, 0),
                          }))
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                        disabled={(currentIndices[post._id] || 0) === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setCurrentIndices(prev => ({
                            ...prev,
                            [post._id]: Math.min((prev[post._id] || 0) + 1, post.images.length - 1),
                          }))
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                        disabled={(currentIndices[post._id] || 0) === post.images.length - 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                <div className="flex justify-center mt-2 space-x-2">
                  {post.images?.filter(Boolean).map((image, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                      <img
                        src={image}
                        alt={`Post image ${i + 1}`}
                        className="w-full h-64 sm:h-96 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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

      {loading && page > 1 && (
        <div className="text-center text-gray-500 text-lg">Loading more posts...</div>
      )}
    </div>
  );
}

export default UserPosts;
