import React from 'react'
import * as BooksAPI from "../BooksAPI"
import Book from './Book';
import { Link } from "react-router-dom"


export default function Search() {

  // Using the State hook to update value of Results
  const [Results, setResults] = React.useState([]);

  // Filter out the book, move it from Search page and append it to the end of the list
  // so it appears at the end of whatever shelf it was added to in the main page.
  function message(book,shelf) {
    book.shelf = shelf;
    BooksAPI.update(book.id, shelf).then(() => {
    setResults([...Results.filter((b) => b.id !== book.id), book]);
    });
     
      console.log('Shelf changed')
  }

    // Using useRef hook to store value of selection
    const searchElement = React.useRef(null)
  
    // Getting all books to compare them with search books
    let grb = []
    const getBooks = async () => {
    grb = await BooksAPI.getAll();
  }
  getBooks()

  // A function that checks the book has certain properties and then compares books of main and books of search
  function checkBook(searchBook) {
      if (searchBook.hasOwnProperty('imageLinks')) {
        if (searchBook.hasOwnProperty('shelf')) {
          return true
        } else {
          searchBook.shelf = "none"
        }

        for (let i in grb) {
          if (searchBook.id === grb[i].id) {
            searchBook.shelf = grb[i].shelf
          }
        }

        return searchBook

      }else{
          return false
      }

  }

  let checkedBooks = []
  let res = []

  // Getting all books for search page using BooksAPI function (search)
  const getSearch = async () => {

      if (searchElement.current.value === "") { // Validating user input
        return setResults([])
      }else{
        res = await BooksAPI.search(searchElement.current.value, 20);
      }

      if (res.hasOwnProperty('error')) { // Check if returned object is empty
        return false
      }else{
        checkedBooks = res.filter(book => 
          checkBook(book)
          )
          setResults(checkedBooks)
      }
    }
    
  return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link to='/' className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input ref={searchElement} onChange={() => getSearch()}
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {Results.map(book => {
                return <Book fun={message} key={book.id} book={book} id={book.id} title={book.title} authors={book.authors} thumbnail={book.imageLinks.smallThumbnail}/>
                } )}
      </ol>
    </div>
  </div>
  )
}
