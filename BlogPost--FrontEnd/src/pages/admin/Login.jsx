import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { setToken } from '../../services/auth';
import ServerWakeMessage from '../../components/ServerWakeMessage';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      setToken(response.data.token);
      navigate('/admin/posts');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-4">
      <div className="admin-auth-card mx-auto">
        <h1 className="mb-3">Admin Login</h1>
        <p className="text-muted">Login to create, edit, and delete blog posts.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="admin123"
              required
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {loading && <ServerWakeMessage title="Connecting to admin server..." compact />}
        </form>
      </div>
    </main>
  );
};

export default Login;
