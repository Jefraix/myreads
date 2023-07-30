import BookCover from "./BookCover"
import BookshelfChanger from "./BookshelfChanger"

const Book = ({Book}) => {
  return (
    <div className="book">
      <div className="book-top">
        <BookCover cover={Book.cover}/>
        <BookshelfChanger />
      </div>
      <div className="book-title">{Book.title}</div>
      <div className="book-authors">{Book.author}</div>
    </div>
  )
}

export default Book