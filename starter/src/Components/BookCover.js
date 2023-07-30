const BookCover = ({ cover }) => {
  return (
    <div
      className="book-cover"
      style={{
        width: cover.width,
        height: cover.height,
        backgroundImage: cover.image,
      }}
    ></div>
  )
}

export default BookCover