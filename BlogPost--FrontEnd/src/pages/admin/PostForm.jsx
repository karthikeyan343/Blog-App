import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import ServerWakeMessage from '../../components/ServerWakeMessage';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadFormData = async () => {
      try {
        const categoryRequest = api.get('/categories');
        const postRequest = isEditing ? api.get(`/posts/${id}`) : null;
        const [categoryResponse, postResponse] = await Promise.all([
          categoryRequest,
          postRequest
        ]);

        if (cancelled) {
          return;
        }

        setCategories(categoryResponse.data);

        if (postResponse) {
          const post = postResponse.data;
          setFormData({
            title: post.title || '',
            content: post.content || '',
            category: post.category?._id || post.category || '',
            author: post.author || '',
            image: post.image || ''
          });
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.response?.data?.message || 'Unable to load form data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadFormData();

    return () => {
      cancelled = true;
    };
  }, [id, isEditing]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (isEditing) {
        await api.put(`/posts/${id}`, formData);
      } else {
        await api.post('/posts', formData);
      }

      navigate('/admin/posts');
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ServerWakeMessage title="Loading post form..." />;
  }

  return (
    <main className="container py-4">
      <div className="admin-form-header mb-4">
        <Link to="/admin/posts" className="btn btn-outline-secondary btn-sm mb-3">
          Back to Posts
        </Link>
        <h1>{isEditing ? 'Edit Post' : 'Create Post'}</h1>
        <p className="text-muted mb-0">
          Fill the details below. Image URL is optional because the app has a dummy image fallback.
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="admin-post-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Author</label>
            <input
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            rows="9"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content"
            required
          />
        </div>

        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </main>
  );
};

export default PostForm
