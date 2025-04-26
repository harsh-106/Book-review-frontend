import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Browse from './Browse';
import { BOOK_API_END_POINT } from '../utils/constant';

function CreateBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${BOOK_API_END_POINT}`, {
        ...formData,
        publishedYear: parseInt(formData.publishedYear) || undefined,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Book created:', response.data);

      
      navigate('/');
      
    } catch (error) {
      console.error('Error creating book:', error);
      setError(error.response?.data?.message || 'Failed to create book');
    }
  };

  return (
    <>
    <Browse/>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
          ></textarea>

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            value={formData.publishedYear}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateBook;
