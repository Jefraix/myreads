import "./App.css";
import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import * as BooksAPI from "./BooksAPI"

// Components
import SearchBooks from "./Components/SearchBooksPage/SearchBooks"
import ListBooks from "./Components/ListBooksPage/ListBooks"

function App() {
  localStorage.token = "jaguilera-udacity"

  const [shelfs, SetShelfs] = useState({})
  const [mappings, SetMappings] = useState({})

  /**
  * @description Sets shelfs object from books associated with token
  * @param {Object Array} books - Array containing objects representing books
  * @returns {Object} Copy of new shelfs object
  */
  const arrangeShelfs = (books) => {
    const shelfsObj = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }

    books.forEach(book => {
      const simpleBook = {
        id: book.id,
        title: book.title,
        authors: book.authors ?? [],
        shelf: book.shelf,
        imageURL: book.imageLinks?.thumbnail
      }

      shelfsObj[book.shelf].push(simpleBook)
    });

    SetShelfs(shelfsObj);

    return shelfsObj;
  }

  /**
  * @description Creates an object where book ids are mapped to their shelf name
  * @param {Object} shelfsObj - Object representing desired state of shelfs
  */
  const mapBookIDs = (shelfsObj) => {
    let idMappings = {}

    Object.keys(shelfsObj).forEach(bookshelf =>
      shelfsObj[bookshelf].forEach(book =>
        idMappings = Object.assign({}, idMappings, { [book.id]: bookshelf })
      )
    );

    SetMappings(idMappings);
  }

  /**
  * @description Updates the shelf of a given book in the backend
  * @param {string} bookshelf - The shelf to put the book into
  * @param {Object} book - Object representing the book to update
  * @param {function} SetState - Function that sets state after book update
  */
  const updateBook = async (bookshelf, book, SetState) => {
    await BooksAPI.update(book, bookshelf);
    SetState();
  }

  /**
  * @description Updates the shelfs object to include given book in given shelf in the frontend
  * @param {string} bookshelf - The shelf to put the book into
  * @param {Object} book - Object representing the book to add
  */
  const addTo = (bookshelf, book) => {
    const newShelf = [...shelfs[bookshelf], book]
    const newShelfsObject = Object.assign({}, shelfs, { [bookshelf]: newShelf });

    updateBook(bookshelf, book, () => {
      mapBookIDs(newShelfsObject)
      SetShelfs(newShelfsObject)
    });
  }

  /**
  * @description Updates the shelfs object to remove given book in given shelf in the frontend
  * @param {string} bookshelf - The shelf to remove the book from
  * @param {Object} book - Object representing the book to remove
  */
  const removeFrom = (bookshelf, book) => {
    const newShelf = shelfs[bookshelf].filter(b => b.id !== book.id)
    const newShelfsObject = Object.assign({}, shelfs, { [bookshelf]: newShelf });

    updateBook("none", book, () => {
      mapBookIDs(newShelfsObject)
      SetShelfs(newShelfsObject)
    });
  }

  /**
  * @description Updates the shelfs object to swap given book in to new shelf in the frontend
  * @param {string} oldBookshelf - The shelf to remove the book from
  * @param {string} newBookshelf - The shelf to put the book into
  * @param {Object} book - Object representing the book to move
  */
  const swapBookshelfs = (oldBookshelf, newBookshelf, book) => {
    const oldShelf = shelfs[oldBookshelf].filter(b => b.id !== book.id)
    const newShelf = [...shelfs[newBookshelf], book]

    const newShelfsObject = Object.assign({}, shelfs,
      {
        [newBookshelf]: newShelf,
        [oldBookshelf]: oldShelf
      }
    );

    updateBook(newBookshelf, book, () => {
      mapBookIDs(newShelfsObject)
      SetShelfs(newShelfsObject)
    });
  }

  /**
  * @description Selects appropriate update to the state from given bookshelves
  * @param {string} currentBookshelf - The shelf to remove the book from
  * @param {string} newBookshelf - The shelf to put the book into
  * @param {Object} book - Object representing the book to move
  */
  const onBookshelfChange = (book, currentBookshelf, newBookshelf) => {
    if (currentBookshelf === newBookshelf) {
      console.log("Tried changing to current bookshelf");
      return;
    }

    if (currentBookshelf === 'none') {
      addTo(newBookshelf, book);
    } else if (newBookshelf === 'none') {
      removeFrom(currentBookshelf, book);
    } else {
      swapBookshelfs(currentBookshelf, newBookshelf, book);
    }
  }

  // This will fetch books associated with the token
  useEffect(() => {
    const getMyBooks = async () => {
      const books = await BooksAPI.getAll();

      const shelfsObj = arrangeShelfs(books);
      mapBookIDs(shelfsObj);
    }

    getMyBooks();
  }, [])

  return (
    <Routes className="app">
      <Route exact path="/" element={
        <ListBooks
          shelfs={shelfs}
          OnBookshelfChange={onBookshelfChange}
        />
      }/>
      <Route path="/search" element={
        <SearchBooks
          bookidMappings={mappings}
          OnBookshelfChange={onBookshelfChange}
        />
      }/>
    </Routes>
  );
}

export default App;
