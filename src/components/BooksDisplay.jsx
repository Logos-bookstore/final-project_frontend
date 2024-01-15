import BookCard from './BookCard';
import CartBtn from './CartBtn';
import { v4 as uuidv4 } from 'uuid';

export default function BooksDisplay({ books, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className='books-container' key={uuidv4()}>
      {books.map((book) => {
        return (
          <div key={book._id}>
            <BookCard key={book._id} book={book} />
            <CartBtn key={uuidv4()} book={book} />
          </div>
        );
      })}
    </div>
  );
}
