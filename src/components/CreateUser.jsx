

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext'; 
import Browse from './Browse';
import { USER_API_END_POINT } from '../utils/constant';

function CreateUser({ onUserCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const existingUserRes = await axios.get(`${USER_API_END_POINT}/email/${email}`);

      if (existingUserRes.data.exists) {
        setError('Account already exists. Please log in.');
        return;
      }

      const res = await axios.post(`${USER_API_END_POINT}`, {
        name,
        email,
        bio,
      });

      const user = res.data;

      
      setUser(user);

      alert('User created successfully!');

      if (onUserCreated) onUserCreated(user);

      
      navigate('/login');

      
      setName('');
      setEmail('');
      setBio('');
    } catch (error) {
      alert('Failed to create user');
      console.error(error);
    }
  };

  return (
    <>
      <Browse />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700">
              Log in here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default CreateUser;
