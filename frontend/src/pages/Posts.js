import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const addPost = async () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.post("/api/post", { text }, config);
      setText("");
      toast.success(res.data.msg);
      fetchPosts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/post");
      setPosts(res.data.posts);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <FormControl type="text" onChange={(e) => setText(e.target.value)} />
      <Button variant="primary" onClick={addPost}>
        Add post
      </Button>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.userId.username}</h3>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
