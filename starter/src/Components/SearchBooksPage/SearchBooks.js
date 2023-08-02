import { Link } from "react-router-dom";
import { useState } from "react";

// Components
import Book from "../Book";

import * as BooksAPI from "../../BooksAPI"

/**
* @description Contains components of the search page
* @param {Object} bookidMappings - Object where book ids are mapped to their shelf name
* @param {function} OnBookshelfChange - Function that triggers to propagate state change
*/
const SearchBooks = ({ bookidMappings, OnBookshelfChange }) => {
  const [query, SetQuery] = useState("");
  const [bookResults, SetBookResults] = useState([]);

  /**
  * @description Fetches book results from the given query
  * @param {string} query - The search query entered into the search bar
  */
  const updateResults = (query) => {
    const performSearch = async () => {
      const res = await BooksAPI.search(query, 20);

      if (Array.isArray(res)) {
        // Simplify the object to include only necessary information
        const resBooks = res.map(book => {
          return {
            id: book.id,
            title: book.title,
            authors: book.authors ?? [],
            shelf: bookidMappings[book.id] ?? "none",
            imageURL: book.imageLinks?.thumbnail
          };
        });
        SetBookResults(resBooks);
      }
    }

    query !== "" ? performSearch() : SetBookResults([]);
    SetQuery(query);
  }

  /**
  * @description Function triggered when the bookshelf is changed for a book
  * @param {Object Array} newBook - Object representing the book whose shelf changed
  * @param {string} previousSelection - The previous selection in BookshelfChanger
  * @param {string} newSelection - The new selection in BookshelfChanger
  */
  const onBookshelfChangeInResults = (newBook, previousSelection, newSelection) => {
    const newResults = bookResults.map(book => {
      if (book.id === newBook.id) book.shelf = newSelection
      return book
    })

    SetBookResults(newResults)
    OnBookshelfChange(newBook, previousSelection, newSelection)
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
                OnBookshelfChange={onBookshelfChangeInResults}
              />
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default SearchBooks;