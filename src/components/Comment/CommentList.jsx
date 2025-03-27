function CommentList({ comments }) {
    return (
      <div>
        {comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            <small>By: {comment.userId.username}</small>
          </div>
        ))}
      </div>
    );
  }
  
  export default CommentList;