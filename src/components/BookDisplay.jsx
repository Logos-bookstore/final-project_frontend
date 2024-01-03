export default function BookDisplay({ books, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className='books-container'>
      {books.map((book) => {
        return (
          <div key={book._id} className='single-book-container'>
            <h2>{book.title}</h2>
            <h3>
              {book.author.firstName} {book.author.lastName}
            </h3>
            <p>{book.year}</p>
            <p>{book.publisher}</p>
            <p>{book.price} €</p>
          </div>
        );
      })}
    </div>
  );
}
