import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import CartBtn from '../components/CartBtn';
import { Context } from '../context/Context';

export default function Genre() {
  const { state } = useLocation();
  const {booksToGenre, setBooksToGenre} = useContext(Context);
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
  return (
    <>
      <h4>Genre: {state}</h4>
      <div className='books-container'>
        {booksToGenre.map((book) => {
          return (
            <>
              <div>
                <BookCard key={book._id} book={book} />
                <CartBtn book={book}/>
              </div>
            </>
          );
        }
        )}
      </div>
    </>
  );
}
