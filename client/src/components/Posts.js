import React from "react";

export default function Posts(props) {
  const posts = props.posts;
  return (
    <div className="posts">
      {posts.map(post => (
        <div className="postCard" key={post.id}>
          <p className="postCardTitle">{post.title}</p>
          <p className="postCardContents">{post.contents}</p>
          <p className="postCardContents">{post.created_at}</p>
        </div>
      ))}
    </div>
  );
}
