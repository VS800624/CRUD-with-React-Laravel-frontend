import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  const [form, setForm] = useState({ title: '', author: '', publisher: '', price: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}`)
      .then(res => setForm(res.data.book))
      .catch(err => alert("Book not found"));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/books/${id}`, form)
      .then(() => navigate("/"))
      .catch(err => alert("Error: " + err.response?.data?.message));
  };

  return (
    <div className="container mt-3">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'author', 'publisher', 'price'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" name={field} className="form-control"
              value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} required />
          </div>
        ))}
        <button className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
