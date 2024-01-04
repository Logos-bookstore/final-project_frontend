export default function BookCard({ book }) {
  console.log(book);
  return (
    <div key={book._id} className='single-book-container'>
      <img src={book.image.thumbnail} alt="" />
      <h2>{book.title}</h2>
      <h3>
        {book.author.firstName} {book.author.lastName}
      </h3>
      <p>{book.year}</p>
      <p>{book.publisher}</p>
      <p>{book.price} €</p>
    </div>
  );
}
