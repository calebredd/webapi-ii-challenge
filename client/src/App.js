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
  return (
    <div className="App">
      <header className="App-header">
        <h1>API Post/Blog Access</h1>
      </header>
      <Posts posts={posts} />
    </div>
  );
}

export default App;
