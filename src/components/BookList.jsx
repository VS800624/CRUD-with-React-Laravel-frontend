import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/books")
    .then(response => {
      console.log("API Response:", response.data); 
      setBooks(response.data.book || []); 
       setLoading(false);
    })
    .catch(() => {
        console.error("Error fetching books:", error)
        setLoading(false);
      });
}, []);

  const deleteBook = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(error => console.error("Delete failed:", error));
  };

  if (loading) return <Spinner animation="border" className="d-block m-auto mt-5" />;

  return (
    <div className="container mt-3">
      <h2>Books</h2>
      <Link to="/add" className="btn btn-success mb-3">Add Book</Link>
      <table className="table table-bordered">
        <thead>
          <tr><th>Id</th><th>Title</th><th>Author</th><th>Publisher</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>₹{book.price}</td>
              <td>
                <Link to={`/show/${book.id}`} className="btn btn-primary btn-sm me-2">Show</Link>
                <Link to={`/edit/${book.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => deleteBook(book.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
