import "./App.css";
import { Route, Routes } from "react-router-dom";

// Components
import SearchBooks from "./Components/SearchBooksPage/SearchBooks"
import ListBooks from "./Components/ListBooksPage/ListBooks";

function App() {
  return (
    <Routes className="app">
      <Route exact path="/" element={
        <ListBooks />
      }/>
      <Route path="/search" element={
        <SearchBooks />
      }/>
    </Routes>
  );
}

export default App;
