import { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import { BOOK_API_END_POINT } from '../utils/constant';

function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${BOOK_API_END_POINT}`);
        // setBooks(res.data.books); 
        setBooks(res.data?.books || []);
      } catch (error) {
        console.error('Error fetching books:', error.message);
        alert('Failed to fetch books. Please try again later.');
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a book..."
        className="w-full max-w-md mx-auto block p-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BookList books={filteredBooks} />
    </div>
  );
}

export default Home;
