import "./App.css";
import { useState, useEffect } from "react";
import BookShelf from "./components/BookShelf";
import * as BooksAPI from "./BooksAPI"
import { Link } from "react-router-dom"

function App() {

  // Using the State hook to update value of Books
  const [Books, setBooks] = useState([]);
  
  // Getting all books using BooksAPI function (getAll)
  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res)
  }

  // Using the Effect hook to fetch data from BooksAPI
  useEffect(() => {
    getBooks()
  }, [])

  // Filtring books that has shelf with value "currentlyReading"
  const CurrentlyReadingBooks = Books.filter(book => 
    book.shelf === "currentlyReading"
    )

  // Filtring books that has shelf with value "wantToRead"
  const WantToReadBooks = Books.filter(book => 
    book.shelf === "wantToRead"
    )

  // Filtring books that has shelf with value "read"
  const ReadBooks = Books.filter(book => 
    book.shelf === "read"
    )

  // Filter out the book and append it to the end of the list
  // so it appears at the end of whatever shelf it was added to.
  const updateShelf = (book, shelf) => {
  book.shelf = shelf;
  BooksAPI.update(book.id, shelf).then(() => {
  setBooks([...Books.filter((b) => b.id !== book.id), book]);
  });
  };

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf title="Currently Reading" books={CurrentlyReadingBooks} fun={updateShelf}/>
              <BookShelf title="Want to Read" books={WantToReadBooks} fun={updateShelf}/>
              <BookShelf title="Read" books={ReadBooks} fun={updateShelf}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search"/>
          </div>
        </div>
    </div>
  );
}

export default App;
