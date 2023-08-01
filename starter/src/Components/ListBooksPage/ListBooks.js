import { Link } from "react-router-dom";

// Components
import Bookshelf from "./Bookshelf"

const ListBooks = ({ shelfs, OnBookshelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        <Bookshelf 
            title="Currently Reading" 
            Books={shelfs['currentlyReading']}
            OnBookshelfChange={OnBookshelfChange}
          />
          <Bookshelf 
            title="Want To Read" 
            Books={shelfs['wantToRead']}
            OnBookshelfChange={OnBookshelfChange}
          />
          <Bookshelf 
            title="Read" 
            Books={shelfs['read']}
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