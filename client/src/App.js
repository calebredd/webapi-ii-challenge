import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Posts from "./components/Posts";
function App() {
  const [posts, setPosts] = useState([""]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/posts")
      .then(res => {
        console.log(res.data);
        setPosts(res.data.posts);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(e.target.contents.value);
    axios
      .post(`http://localhost:9000/api/posts`, {
        title: e.target.title.value,
        contents: e.target.contents.value
      })
      .then(res => {
        // console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => console.error(err));
    e.target.reset();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Post/Blog Access</h1>
        <form onSubmit={handleSubmit} className="addPost">
          <input type="text" name="title" placeholder="Blog Title" />
          <textarea type="text" name="contents" placeholder="Blog Content" />
          <button type="submit">Add Blog Post</button>
        </form>
      </header>
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
