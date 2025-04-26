

import { useState } from 'react';
import { useUser } from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Browse from './Browse';
import { USER_API_END_POINT } from '../utils/constant';

function Login() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.get(`${USER_API_END_POINT}`); 
      console.log(res.data);
      const allUsers = res.data; 
      const user = allUsers.find((u) => u.email === email);
      if (!user) {
        setError('User not found. You may want to register.');
        return;
      }

      setUser(user); 
      alert(`Logged in as ${user.name}`);
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <>
      <Browse />
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
