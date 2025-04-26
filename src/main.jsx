import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './utils/UserContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddReview from './pages/AddReview';
import BookDetails from './pages/BookDetails';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import UserPage from './components/UserPage';
import CreateBook from './components/CreateBook';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/create-book" element={<CreateBook />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
