// Components
import BookCover from "./BookCover"
import BookshelfChanger from "./BookshelfChanger"

/**
* @description Represents a book
* @param {Object} Book - Simplified book object containing only important information
* @param {function} OnBookshelfChange - Function that triggers to propagate state change
*/
const Book = ({ Book, OnBookshelfChange }) => {

  /**
  * @description Function triggered when the bookshelf is changed
  * @param {string} previousSelection - The previous selection in BookshelfChanger
  * @param {string} newSelection - The new selection in BookshelfChanger
  */
  const onBookshelfChangerChange = (previousSelection, newSelection) => {
    const newBook = Object.assign({}, Book, { shelf: newSelection })
    OnBookshelfChange(newBook, previousSelection, newSelection)
  }

  return (
    <div className="book">
      <div className="book-top">
        <BookCover imageURL={Book.imageURL}/>
        <BookshelfChanger 
          currentBookshelf={Book.shelf}
          OnBookshelfChangerChange={onBookshelfChangerChange}
        />
      </div>
      <div className="book-title">{Book.title}</div>
      <div className="book-authors">
        {Book.authors.map((author, idx) => <p key={idx}>{author}</p>)}
      </div>
    </div>
  );
}

export default Book