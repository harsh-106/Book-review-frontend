import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';


const Browse = () => {
    const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); 
    navigate('/'); 
  };
  return (
    <div className=" bg-gray-100 text-gray-800">
    
    <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-md gap-4 md:gap-0">
    <Link to="/" className="w-full md:w-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
        📚 Book Review Platform
      </h1>
      </Link>
      
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {user ? (
          <>
            <span className="text-gray-600 text-sm md:text-base">
              Welcome, {user.name}
            </span>
            
            <Link to="/create-book">
  <button className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
    Add Book
  </button>
</Link>
           
            <Link to={`/users/${user._id}`} className="w-full md:w-auto">
              <button className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Profile
              </button>
            </Link>

            
            <button
              onClick={handleLogout}
              className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            
            <Link to="/login" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Login
              </button>
            </Link>

            
            <Link to="/register" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </header>

   
  </div>
  )
}

export default Browse
