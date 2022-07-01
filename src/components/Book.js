import React from "react";
import { useRef } from "react";

export default function Book(props) {

    // Using useRef hook to store value of selection
    const selectOption = useRef(null)

    return (
        <li>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 192,
                      backgroundImage:
                        `url(${props.thumbnail})`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select value={props.book.shelf} ref={selectOption} onChange={() => props.fun(props.book,selectOption.current.value)}>
                      <option  disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{props.title}</div>
                <div className="book-authors">{props.authors}</div>
              </div>
        </li>
    )
}