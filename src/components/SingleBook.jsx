import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function SingleBook() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}`)
      .then(response => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch(() => {
        setError("Book not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block m-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <Card className="mx-auto shadow" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="mb-3">{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Author: {book.author}</Card.Subtitle>
          <Card.Text>
            <strong>Publisher:</strong> {book.publisher} <br />
            <strong>Price:</strong> ₹{book.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SingleBook;
