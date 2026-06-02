import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import api from "../services/api";
import ServerWakeMessage from "../components/ServerWakeMessage";

const PostList = ({sideBar}) => {
    const [posts,setPosts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        let cancelled = false;

        const fetchData = async () => {
          try {
            const [postsResponse, categoriesResponse] = await Promise.all([
              api.get('/posts'),
              api.get('/categories')
            ]);

            if (!cancelled) {
              setPosts(postsResponse.data);
              setCategories(categoriesResponse.data);
            }
          } catch (error) {
            if (!cancelled) {
              setError(error.response?.data?.message || "Unable to load blog posts.");
            }
          } finally {
            if (!cancelled) {
              setLoading(false);
            }
          }
        };

        fetchData();

        return () => {
          cancelled = true;
        };
    },[])

  if (loading) {
    return <ServerWakeMessage title="Loading posts..." />;
  }

  if (error) {
    return <h4 className="container mt-4 text-danger">{error}</h4>;
  }

  return (
    <>
      
      <main>
        
        <div className="container mt-2">
          <div className="row">
            {/* Left Side - Posts */}
            {sideBar ? (            <div className="col-lg-8">
              <h1 className="mb-4">Latest Posts</h1>
                 {
                   posts.length>0 ? posts.map((post)=> <Post key={post._id} post={post}/> ) : <h4>No Post Available</h4>
                 }
            </div>) : (<div className="col-lg-12">
              <h1 className="mb-4">Latest Posts</h1>
                 {
                   posts.length>0 ? posts.map((post)=> <Post key={post._id} post={post}/> ) : <h4>No Post Available</h4>
                 }
            </div>)}

      
            {sideBar && (
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">About Me</h5>
                  <p className="card-text">
Hello! I'm Karthikeyan, a final year B.Tech IT student and an
aspiring full-stack developer. I enjoy building web applications
using the MERN stack (MongoDB, Express, React, Node.js).

Through this blog, I share what I learn about programming,
web technologies, and software development.
                  </p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Categories</h5>

                  <ul className="list-group">
                    {categories.map((category) =>{ return <li key={category._id} className="list-group-item">
                      <Link to={`/posts/category/${category._id}`} className="text-black">
                       {category.name}
                      </Link>
                    </li>})}
                  </ul>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </main>
  
    </>
  );
};

export default PostList;
