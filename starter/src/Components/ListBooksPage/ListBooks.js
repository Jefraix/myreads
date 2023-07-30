import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf"

const ListBooks = ({ currentlyReading, wantToRead, read }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" BookshelfBooks={currentlyReading} />
          <Bookshelf title="Want to Read" BookshelfBooks={wantToRead} />
          <Bookshelf title="Read" BookshelfBooks={read} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks;