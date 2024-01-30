import { useContext } from 'react';
import { Context } from '../context/Context';
import { v4 as uuidv4 } from 'uuid';
import BookCard from './bookCard/BookCard';
import CartBtn from './CartBtn';
import DeleteBtnAdmin from './DeleteBtnAdmin';
import DeleteBook from './deleteBook/DeleteBook';
import UpdateBook from './updateBook/UpdateBook';
import UpdateBtnAdmin from './UpdateBtnAdmin';

export default function BooksDisplay({ books, loading }) {
  const { user, bookToUpdate, bookToDelete } = useContext(Context);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className='books-container'>
      {books.map((book) => {
        return (
          <div key={book._id}>
            <div className='bookcard-and-btns-container'>
              <BookCard key={book._id} book={book} />
              <div className='cart-and-admin-btns-container'>
                <CartBtn key={uuidv4()} book={book} />
                {user?.role === 'admin' && (
                  <>
                    <UpdateBtnAdmin book={book} />
                    <DeleteBtnAdmin book={book} />
                  </>
                )}
              </div>
            </div>
            {bookToUpdate?._id === book._id && <UpdateBook book={book} />}
            {bookToDelete?._id === book._id && <DeleteBook book={book} />}
          </div>
        );
      })}
    </div>
  );
}
