

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview';
import Browse from '../components/Browse';
import { BOOK_API_END_POINT, REVIEW_API_END_POINT } from '../utils/constant';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const reviewRes = await axios.get(`${REVIEW_API_END_POINT}?bookId=${id}`);
      console.log('Fetched reviews:', reviewRes.data);

      const fetchedReviews = Array.isArray(reviewRes.data.reviews)
        ? reviewRes.data.reviews
        : Array.isArray(reviewRes.data)
        ? reviewRes.data
        : [];

      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error.message);
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookRes = await axios.get(`${BOOK_API_END_POINT}/${id}`);
        setBook(bookRes.data.book);
        await fetchReviews();
      } catch (error) {
        console.error('Error loading book or reviews:', error.message);
        alert('Something went wrong loading the page.');
      }
    };

    fetchBookData();
  }, [id]);

  const handleNewReview = async () => {
    await fetchReviews();
  };

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <>
    <Browse/>
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-8">
      <h1 className="mt-4 text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-2 text-gray-800">{book.description}</p>

      {reviews?.length > 0 ? (
        <p className="text-yellow-500 text-lg mt-4">
          ⭐ Average Rating:{' '}
          {(
            reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
          ).toFixed(1)}{' '}
          / 5
        </p>
      ) : (
        <p className="text-lg mt-4">⭐ No ratings yet</p>
      )}

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((rev) => (
            <li key={rev._id} className="bg-gray-100 p-3 rounded-md">
              <p className="font-medium">{rev.userId?.name || 'Anonymous'}</p>

              <p className="text-yellow-500">⭐ {rev.rating}</p>
              <p className="text-sm text-gray-700">{rev.comment}</p>
              {rev.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <hr className="my-6" />

      <AddReview bookId={id} onReviewAdded={handleNewReview} />
    </div>
    </>
  );
}

export default BookDetails;
