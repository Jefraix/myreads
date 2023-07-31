import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI"

// Components
import SearchBooks from "./Components/SearchBooksPage/SearchBooks"
import ListBooks from "./Components/ListBooksPage/ListBooks";

function App() {
  localStorage.token = "jaguilera-udacity" 

  const [shelfs, SetShelfs] = useState({})

  const arrangeShelfs = (books) => {
    const shelfsObj = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }

    books.forEach(book => shelfsObj[book.shelf].push(book))
    SetShelfs(shelfsObj)
  }

  const updateBook = async (bookshelf, book, SetState) => {
    const res = await BooksAPI.update(book, bookshelf)
    console.log(res)

    SetState()
  }

  const addTo = (bookshelf, book) => {
    const newShelf = [...shelfs[bookshelf], book]
    const newShelfsObject = Object.assign({}, shelfs, { [bookshelf]: newShelf })

    updateBook(bookshelf, book, () => SetShelfs(newShelfsObject))
  }

  const removeFrom = (bookshelf, book) => {
    const newShelf = shelfs[bookshelf].filter(b => b.id !== book.id)
    const newShelfsObject = Object.assign({}, shelfs, { [bookshelf]: newShelf })

    updateBook("none", book, () => SetShelfs(newShelfsObject))
  }

  const swapBookshelfs = (oldBookshelf, newBookshelf, book) => {
    const oldShelf = shelfs[oldBookshelf].filter(b => b.id !== book.id)
    const newShelf = [...shelfs[newBookshelf], book]

    const newShelfsObject = Object.assign({}, shelfs, 
      { 
        [newBookshelf]: newShelf, 
        [oldBookshelf]: oldShelf 
      }
    )

    updateBook(newBookshelf, book, () => SetShelfs(newShelfsObject))
  }

  const onBookshelfChange = (book, currentBookshelf, newBookshelf) => {
    if (currentBookshelf === newBookshelf) {
      console.log("Tried changing to current bookshelf")
      return
    }

    if (currentBookshelf === 'none') {
      addTo(newBookshelf, book)
    } else if (newBookshelf === 'none') {
      removeFrom(currentBookshelf, book)
    } else {
      swapBookshelfs(currentBookshelf, newBookshelf, book)
    }
  }

  useEffect(() => {
    const getMyBooks = async () => {
      const books = await BooksAPI.getAll()
      const myBooks = books.map(book => {
        return {
          id: book.id,
          title: book.title,
          authors: book.authors,
          shelf: book.shelf,
          imageURL: book.imageLinks.thumbnail
        }
      })
      console.log(myBooks)

      arrangeShelfs(myBooks)
    }

    getMyBooks()
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
          shelfs={shelfs}
          OnBookshelfChange={onBookshelfChange}
        />
      }/>
    </Routes>
  );
}

export default App;
