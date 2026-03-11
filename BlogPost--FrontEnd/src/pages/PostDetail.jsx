import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const PostDetail = () => {
  const [post, setPost] = useState(null);
  const {id} = useParams();
  
  const fetchPosts = async()=>{
       try {
       const response =  await axios.get(`http://localhost:5000/api/posts/${id}`);
       setPost(response.data);
       } catch (error) {
        console.log("Error while fetching post" ,error);
       }
  }

  useEffect(()=>{
    fetchPosts();
  },[]);

  if(!post){
    return <h1>Loading...</h1>
  }

  const formattedDate = Intl.DateTimeFormat('en-us',{
    month : "long",
    date:"numeric",
    year:"numeric"
}).format(new Date(post.createdAt));

  return (
  
  <div style={{height:'415px'}}>
    <main className="container-fluid my-4">
      <div className="row">
        <article className="col-lg-12">
          <h2 className="blog-post-title">{post.title}</h2>

          <p className="blog-post-meta">
            {formattedDate} by <a href="#">{post.author}</a>
          </p>

          <img className="mb-3 img-fluid" src={post.image} alt="img" />

          <div className="blog-post-content">
            <p>{post.content}</p>
          </div>
        </article>
      </div>
    </main>
    </div>
  )
}

export default PostDetail