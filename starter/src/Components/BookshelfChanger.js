import { useState } from "react";

const BookshelfChanger = ({currentBookshelf, OnBookshelfChangerChange }) => {
  const [selectedBookshelf, SetSelectedBookshelf] = useState(currentBookshelf)

  const onSelectChange = (event) => {
    const previousSelection = selectedBookshelf
    const newSelection = event.target.value

    SetSelectedBookshelf(newSelection)
    OnBookshelfChangerChange(previousSelection, newSelection)
  }

  return (
    <div className="book-shelf-changer">
      <select
        value={selectedBookshelf}
        onChange={onSelectChange}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="Currently Reading">
          Currently Reading
        </option>
        <option value="Want To Read">Want to Read</option>
        <option value="Read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default BookshelfChanger