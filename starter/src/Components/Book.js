// Components
import BookCover from "./BookCover"
import BookshelfChanger from "./BookshelfChanger"

const Book = ({ Book, OnBookshelfChange }) => {

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
  )
}

export default Book