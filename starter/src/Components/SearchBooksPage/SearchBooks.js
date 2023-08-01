import { Link } from "react-router-dom";
import { useState } from "react";

// Components
import Book from "../Book";

import * as BooksAPI from "../../BooksAPI"

const SearchBooks = ({ bookidMappings, OnBookshelfChange }) => {
  const [query, SetQuery] = useState("")
  const [bookResults, SetBookResults] = useState([])

  const updateResults = (query) => {
    const performSearch = async () => {
      const res = await BooksAPI.search(query, 20)

      if (Array.isArray(res)) {
        const resBooks = res.map(book => {
          return {
            id: book.id,
            title: book.title,
            authors: book.authors ?? [],
            shelf: bookidMappings[book.id] ?? "none",
            imageURL: book.imageLinks?.thumbnail
          }
        })

        console.log(resBooks)

        SetBookResults(resBooks)
      }
    }

    if (query !== "") performSearch()
    SetQuery(query)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => updateResults(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {bookResults.map((book, idx) =>
            <li key={idx}>
              <Book 
                Book={book}
                OnBookshelfChange={OnBookshelfChange}
              />
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default SearchBooks;