
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full max-w-xs">
        <h2 className="mt-2 text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-500 text-sm">{book.author}</p>
        <p className="mt-2 text-sm line-clamp-3">{book.description}</p>
      </div>
    </Link>
  );
}

export default BookCard;
