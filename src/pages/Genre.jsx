import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import CartBtn from '../components/CartBtn';
import { Context } from '../context/Context';

export default function Genre() {
  const { state } = useLocation();
  const { booksToGenre, setBooksToGenre } = useContext(Context);
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
            <div key={book._id}>
              <BookCard book={book} />
              <CartBtn book={book} />
            </div>
          );
        })}
      </div>
    </>
  );
}
