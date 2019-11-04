import React from "react";
import axios from "axios";
export default function Posts(props) {
  const posts = props.posts;
  const remove = post => {
    console.log(post);
    axios
      .delete(`http://localhost:9000/api/posts/${post.id}`)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="posts">
      {posts.map(post => (
        <div className="postCard" key={post.id}>
          <p className="postCardTitle">{post.title}</p>
          <p className="postCardContents">{post.contents}</p>
          <p className="postCardContents">{post.created_at}</p>
          <button onClick={() => remove(post)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
}
