import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
const CategoryPost = () => {
    const [posts,setPosts] = useState([]);
    const [category,setCategory] = useState(null);
    const {id} = useParams();

    const fetchPosts = async ()=>{
    const response= await axios.get(`http://localhost:5000/api/categories/category/${id}`);
    setPosts(response.data);
    }

    const fetchCategory = async()=>{
      const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
      setCategory(response.data);
    }
    useEffect(()=>{
        fetchPosts();
        fetchCategory();
    },[])

    if(!category){
        return <>
        loading...
        </>
    }
  return (
    <>
      
      <main>
        <div className="container mt-4">
            <div className="row">
                
                <div className="col-lg-8">
                    <h1 className="mb-4">{category.name}</h1>

                     {
                   posts.length>0 ? posts.map((post)=> <Post post={post}/> ) : <h4>No Post Available</h4>
                 }

                 
                

                </div>

               
            </div>
        </div>
    </main>

  
    </>
  );
};

export default CategoryPost;