import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-kpmg-blue-primary flex items-center justify-center p-4">
      <div className="bg-white/95 rounded-lg p-8 shadow-xl w-full max-w-md backdrop-blur-sm">
        <h1 className="text-6xl font-black tracking-widest text-kpmg-blue-primary text-center mb-8 uppercase">
          Curve
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-kpmg-text mb-2 text-lg">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 border-kpmg-blue-light text-kpmg-text placeholder-kpmg-text/50 focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-kpmg-text mb-2 text-lg">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 border-kpmg-blue-light text-kpmg-text placeholder-kpmg-text/50 focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-kpmg-blue-primary text-white py-3 px-4 rounded font-bold hover:bg-kpmg-blue-medium transition-colors disabled:opacity-50 text-lg"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;