import { useState } from 'react';
import { register } from '../../services/api';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await register({ username, email, password });
      onRegister(response.data.token);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg border border-red-800 bg-zinc-700 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-4xl font-bold text-gray-100 text-center">Register</h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-100"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-100 text-gray-100 bg-transparent rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-300"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-100 text-gray-100 bg-transparent rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-300"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-100 text-gray-100 bg-transparent rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold transition-transform 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'}`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-gray-100 text-center">
          Already have an account? <a href="/login" className="text-blue-300 hover:underline">Log in</a>.
        </p>
      </form>
    </div>
  );
}

export default Register;
