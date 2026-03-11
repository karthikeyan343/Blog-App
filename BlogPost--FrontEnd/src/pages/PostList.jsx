import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = ({sideBar}) => {
    const [posts,setPosts] = useState([]);
    const [categories,setCategories] = useState([]);
    const fetchPosts = async ()=>{
    const response= await axios.get('http://localhost:5000/api/posts');
    setPosts(response.data);
    }

    const fetchCategories = async()=>{
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    }
    useEffect(()=>{
        fetchPosts();
        fetchCategories();
    },[])
  return (
    <>
      
      <main>
        
        <div className="container mt-2">
          <div className="row">
            {/* Left Side - Posts */}
            {sideBar ? (            <div className="col-lg-8">
              <h1 className="mb-4">Latest Posts</h1>
                 {
                   posts.length>0 ? posts.map((post)=> <Post post={post}/> ) : <h4>No Post Available</h4>
                 }
            </div>) : (<div className="col-lg-12">
              <h1 className="mb-4">Latest Posts</h1>
                 {
                   posts.length>0 ? posts.map((post)=> <Post post={post}/> ) : <h4>No Post Available</h4>
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
                    {categories.map((category) =>{ return <li className="list-group-item">
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