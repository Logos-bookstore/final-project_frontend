import BookCard from './BookCard';

export default function BooksDisplay({ books, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className='books-container'>
      {books.map((book) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </div>
  );
}
