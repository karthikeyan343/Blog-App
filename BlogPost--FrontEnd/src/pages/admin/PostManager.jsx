import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { logout } from '../../services/auth';

const PostManager = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to delete post');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return <h4 className="container mt-4">Loading admin posts...</h4>;
  }

  return (
    <main className="container py-4">
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Manage Posts</h1>
          <p className="text-muted mb-0">Create, edit, and delete your personal blog posts.</p>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-primary" to="/admin/posts/new">
            New Post
          </Link>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive admin-table">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.category?.name || 'No category'}</td>
                <td>{post.author}</td>
                <td className="text-end">
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/admin/posts/edit/${post._id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(post._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PostManager
