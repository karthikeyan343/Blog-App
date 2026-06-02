import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ServerWakeMessage from '../components/ServerWakeMessage';

const fallbackImage = '/blog-placeholder.svg';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {id} = useParams();
  
  useEffect(()=>{
    let cancelled = false;

    const fetchPost = async()=>{
      try {
        const response =  await api.get(`/posts/${id}`);
        if (!cancelled) {
          setPost(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.response?.data?.message || "Unable to load this post.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      cancelled = true;
    };
  },[id]);

  if(loading){
    return <ServerWakeMessage title="Loading post..." />
  }

  if(error){
    return <h4 className="container mt-4 text-danger">{error}</h4>
  }

  const formattedDate = Intl.DateTimeFormat('en-us',{
    month : "long",
    day:"numeric",
    year:"numeric"
}).format(new Date(post.createdAt));

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  };

  return (
  
  <div>
    <main className="container-fluid my-4">
      <div className="row">
        <article className="col-lg-12">
          <h2 className="blog-post-title">{post.title}</h2>

          <p className="blog-post-meta">
            {formattedDate} by <span>{post.author}</span>
          </p>

          <img
            className="post-detail-image mb-3 img-fluid"
            src={post.image || fallbackImage}
            alt={post.title}
            onError={handleImageError}
          />

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
