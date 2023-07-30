import BookCover from "./BookCover"
import BookshelfChanger from "./BookshelfChanger"

const Book = ({ Book, Bookshelf, OnBookshelfChange }) => {
  const onBookshelfChangerChange = (previousSelection, newSelection) => {
    OnBookshelfChange(Book, previousSelection, newSelection)
  }

  return (
    <div className="book">
      <div className="book-top">
        <BookCover cover={Book.cover}/>
        <BookshelfChanger 
          currentBookshelf={Bookshelf}
          OnBookshelfChangerChange={onBookshelfChangerChange}
        />
      </div>
      <div className="book-title">{Book.title}</div>
      <div className="book-authors">{Book.author}</div>
    </div>
  )
}

export default Book