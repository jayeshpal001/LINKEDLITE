import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await axios.get("/posts/all");
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err.response.data.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  const createPost = async (content) => {
   try {
    const res = await axios.post("/posts/create", { content });
    console.log(res.data);
    setPosts([res.data, ...posts]); // Add new post to top
   } catch (error) {
    console.error( err.response.data.message);
   }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, loadingPosts, fetchPosts, createPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

