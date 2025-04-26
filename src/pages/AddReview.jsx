


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import axios from 'axios'; 
import { REVIEW_API_END_POINT } from '../utils/constant';

function AddReview({ bookId, onReviewAdded }) {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to add a review.');
      return;
    }

    if (!comment || !rating || !bookId) {
      alert('All fields are required');
      return;
    }

    const newReview = {
      userId: user._id,
      comment,
      rating,
      bookId,
    };

    setIsLoading(true);

    try {
      const res = await axios.post(`${REVIEW_API_END_POINT}`, newReview);

      const data = res.data;

      if (res.status === 201 || res.status === 200) {
        onReviewAdded(data.review || data);
        setComment('');
        setRating(5);
        if (onReviewAdded) onReviewAdded(); 
      } else {
        alert('Error adding review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'An error occurred while submitting the review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add a Review</h3>

      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        required
      ></textarea>

      <div>
        <label className="block mb-1 font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default AddReview;


