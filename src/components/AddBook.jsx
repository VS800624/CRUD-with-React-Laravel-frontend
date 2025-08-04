import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddBook() {
  const [form, setForm] = useState({ title: '', author: '', publisher: '', price: '' });
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/books", form)
      .then(() => navigate("/"))
      .catch(err => alert("Error: " + err.response?.data?.message));
  };

  return (
    <div className="container mt-3">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'author', 'publisher', 'price'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" name={field} className="form-control"
              value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} required />
          </div>
        ))}
        <button className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
