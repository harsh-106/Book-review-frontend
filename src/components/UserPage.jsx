

import { useEffect, useState } from 'react';
import { useUser } from '../utils/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Browse from './Browse';
import { USER_API_END_POINT } from '../utils/constant';

function UserPage() {
  const { user, setUser } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchedUser, setFetchedUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        const data = res.data;

        setFetchedUser(data);
        setBio(data.bio || '');
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        alert('User not found. Redirecting to home.');
        navigate('/');
      }
    };

    fetchUserProfile();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!fetchedUser) return;

    setLoading(true);
    try {
      const res = await axios.put(`${USER_API_END_POINT}/${id}`, {
        bio,
      });

      const updatedUser = res.data;

      alert('Profile updated successfully!');
      setFetchedUser(updatedUser);

      
      if (user && user._id === updatedUser._id) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!fetchedUser) {
    return <div className="text-center mt-10">Loading user profile...</div>;
  }

  return (
    <>
      <Browse />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Name:</label>
            <input
              type="text"
              value={fetchedUser.name}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email:</label>
            <input
              type="email"
              value={fetchedUser.email}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </>
  );
}

export default UserPage;

