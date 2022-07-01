import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Search from "./components/Search";

// let appBooks = []

// function grabBooks(books) {
//   appBooks = books
// }

// console.log(appBooks)

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
