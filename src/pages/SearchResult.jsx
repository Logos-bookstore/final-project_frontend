import BookCard from '../components/BookCard';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import CartBtn from '../components/CartBtn';

export default function SearchResult() {
  const { booksToGenre, setBooksToGenre } = useContext(Context);
  const queryString = new URLSearchParams(window.location.search);
  const setQueryString = () => {
    let result;
    for (const q of queryString) {
      result = q[1];
    }
    return result;
  };
  const ourUrl = setQueryString().split(' ').join('+');
  useEffect(() => {
    async function bookSearch() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BOOK_SEARCH}${ourUrl}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setBooksToGenre(data.data);
          }
        }
      } catch (error) {
        //
      }
    }
    bookSearch();
  }, [ourUrl]);

  const sortedBooks = booksToGenre.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );
  return (
    <>
      <div className='books-container'>
        {sortedBooks.map((book) => (
          <div key={book._id}>
            <BookCard book={book} />
            <CartBtn book={book} />
          </div>
        ))}
      </div>
    </>
  );
}
