import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route,  Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import SingleBook from './components/SingleBook';



function App() {
  return (
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/show/:id" element={<SingleBook />} />
      </Routes>
  );
}

export default App
