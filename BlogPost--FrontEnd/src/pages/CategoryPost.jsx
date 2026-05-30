import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import api from "../services/api";

const CategoryPost = () => {
    const [posts,setPosts] = useState([]);
    const [category,setCategory] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const {id} = useParams();

    useEffect(()=>{
        let cancelled = false;

        const fetchData = async () => {
          try {
            const [postsResponse, categoryResponse] = await Promise.all([
              api.get(`/categories/category/${id}`),
              api.get(`/categories/${id}`)
            ]);

            if (!cancelled) {
              setPosts(postsResponse.data);
              setCategory(categoryResponse.data);
            }
          } catch (error) {
            if (!cancelled) {
              setError(error.response?.data?.message || "Unable to load this category.");
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
    },[id])

    if(loading){
        return <h4 className="container mt-4">Loading category...</h4>;
    }

    if(error){
        return <h4 className="container mt-4 text-danger">{error}</h4>;
    }

  return (
    <>
      
      <main>
        <div className="container mt-4">
            <div className="row">
                
                <div className="col-lg-8">
                    <h1 className="mb-4">{category.name}</h1>

                     {
                   posts.length>0 ? posts.map((post)=> <Post key={post._id} post={post}/> ) : <h4>No Post Available</h4>
                 }

                 
                

                </div>

               
            </div>
        </div>
    </main>

  
    </>
  );
};

export default CategoryPost;
