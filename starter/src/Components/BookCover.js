import PropTypes from 'prop-types'

/**
* @description A component of book, representing its cover
* @param {string} imageURL - URL pointing to the book cover image if any
*/
const BookCover = ({ imageURL }) => {
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: `url(${imageURL ?? "./assets/placeholderImage.png"})`,
      }}
    ></div>
  );
}

BookCover.propTypes = {
  imageURL: PropTypes.string
}

export default BookCover