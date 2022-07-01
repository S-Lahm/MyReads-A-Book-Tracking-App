import React from "react"
import Book from "./Book"

export default function BookShelf(props) {

    return (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map(book => {
              return <Book key={book.id} book={book} fun={props.fun} id={book.id} title={book.title} authors={book.authors.join("/")} thumbnail={book.imageLinks.smallThumbnail}/>
            } )}
          </ol>
        </div>
    </div>
    )
}

