const BookshelfChanger = ({ currentBookshelf, OnBookshelfChangerChange }) => {

  const onSelectChange = (event) => {
    const previousSelection = currentBookshelf
    const newSelection = event.target.value

    OnBookshelfChangerChange(previousSelection, newSelection)
  }

  return (
    <div className="book-shelf-changer">
      <select
        value={currentBookshelf}
        onChange={onSelectChange}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">
          Currently Reading
        </option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default BookshelfChanger