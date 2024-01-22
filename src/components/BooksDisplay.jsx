import { useContext } from 'react';
import { Context } from '../context/Context';
import { v4 as uuidv4 } from 'uuid';
import BookCard from './BookCard';
import CartBtn from './CartBtn';
import DeleteBtnAdmin from './DeleteBtnAdmin';
import DeleteBook from './DeleteBook';

export default function BooksDisplay({ books, loading }) {
  const { user, bookToDelete } = useContext(Context);

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
            {user?.role === 'admin' && <DeleteBtnAdmin book={book} />}
            {bookToDelete?._id === book._id && <DeleteBook book={book} />}
          </div>
        );
      })}
    </div>
  );
}
