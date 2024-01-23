import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import CartBtn from '../components/CartBtn';
import { Context } from '../context/Context';
import DeleteBtnAdmin from '../components/DeleteBtnAdmin';
import DeleteBook from '../components/DeleteBook';

export default function Genre() {
  const { state } = useLocation();
  const { booksToGenre, setBooksToGenre, user, bookToDelete } =
    useContext(Context);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_ONE_GENRE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ genre: state }),
    })
      .then((res) => res.json())
      .then((res) => {
        res.success && setBooksToGenre(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  const sortedBooks = booksToGenre.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );

  return (
    <>
      <div className='books-container'>
        {sortedBooks.map((book) => {
          return (
            <div className='genre-book' key={book._id}>
              <BookCard book={book} />
              <CartBtn book={book} />
              {user?.role === 'admin' && <DeleteBtnAdmin book={book} />}
              {bookToDelete?._id === book._id && <DeleteBook book={book} />}
            </div>
          );
        })}
      </div>
    </>
  );
}
