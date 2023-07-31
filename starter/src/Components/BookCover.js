const BookCover = ({ imageURL }) => {
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: `url(${imageURL})`,
      }}
    ></div>
  )
}

export default BookCover