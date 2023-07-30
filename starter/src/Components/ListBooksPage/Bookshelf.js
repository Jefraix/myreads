import Book from "../Book"

const Bookshelf = ({ title, BookshelfBooks }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {BookshelfBooks.map((book) => <li><Book Book={book}/></li>)}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf