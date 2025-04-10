function CommentList({ comments }) {
  return (
    <div className="mt-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="border-l-2 border-gray-200 pl-4 py-2">
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-sm text-gray-500">
              By {comment.userId?.username || 'Unknown'} •{' '}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;