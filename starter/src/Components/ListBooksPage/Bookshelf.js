import PropTypes from 'prop-types'

// Components
import Book from "../Book"

/**
* @description Holds a set of books belonging to the shelf
* @param {string} title - The name of the shelf
* @param {Object Array} Books - Array of objects representing books that belong in this shelf
* @param {function} OnBookshelfChange - Function that triggers to propagate state change
*/
const Bookshelf = ({ title, Books, OnBookshelfChange }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Books && Books.map((book, idx) => {
            return (
              <li key={idx}>
                <Book
                  Book={book}
                  OnBookshelfChange={OnBookshelfChange}
                />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  Books: PropTypes.array,
  OnBookshelfChange: PropTypes.func.isRequired,
}

export default Bookshelf