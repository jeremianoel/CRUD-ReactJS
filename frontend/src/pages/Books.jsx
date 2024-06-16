import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const Books = () => {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get('http://localhost:8800/books');
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBooks();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete('http://localhost:8800/books/' + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="bookshop-container">
        <h1>React.js Book Shop</h1>
        <div className="books">
          {books.map((book) => (
            <div className="book" key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <span>${book.price}</span>
              <div className="buttons">
                <button className="delete" onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
                <button className="update">
                  <Link to={`/update/${book.id}`}>Update</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-book">
          <Link to="/add">Add New Book</Link>
        </button>
      </div>
    );
  };
  
  export default Books;