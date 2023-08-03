import PropTypes from 'prop-types'

/**
* @description A component of book, representing the bookshelf changer
* @param {Object} currentBookshelf - Simplified book object containing only important information
* @param {function} OnBookshelfChangerChange - Function that triggers to propagate state change
*/
const BookshelfChanger = ({ currentBookshelf, OnBookshelfChangerChange }) => {
  const bookshelfChangerOptions = [
    { value: "currentlyReading", displayName: "Currently Reading" },
    { value: "wantToRead", displayName: "Want to Read" },
    { value: "read", displayName: "Read" },
    { value: "none", displayName: "None" },
  ]

  /**
  * @description Function called when the shelf selection is changed
  * @param {Object} event - Object representing the event triggered
  */
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
        <option value="nothing" disabled>
          Move to...
        </option>
        {bookshelfChangerOptions.map((option, idx) => 
          <option key={idx} value={option.value}>{option.displayName}</option>
        )}
      </select>
    </div>
  )
}

BookshelfChanger.propTypes = {
  currentBookshelf: PropTypes.string.isRequired,
  OnBookshelfChangerChange: PropTypes.func.isRequired,
}

export default BookshelfChanger