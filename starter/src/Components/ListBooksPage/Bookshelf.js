// Components
import Book from "../Book"

const Bookshelf = ({ title, Books = [], OnBookshelfChange }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Books.map((book, idx) => {
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

export default Bookshelf