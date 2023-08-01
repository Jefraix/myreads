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
  )
}

export default BookCover