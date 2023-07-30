import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf"
//amogus
const ListBooks = ({ currentlyReading, wantToRead, read, OnBookshelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf 
            title="Currently Reading" 
            Books={currentlyReading}
            OnBookshelfChange={OnBookshelfChange}
          />
          <Bookshelf 
            title="Want To Read" 
            Books={wantToRead}
            OnBookshelfChange={OnBookshelfChange}
          />
          <Bookshelf 
            title="Read" 
            Books={read}
            OnBookshelfChange={OnBookshelfChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks;