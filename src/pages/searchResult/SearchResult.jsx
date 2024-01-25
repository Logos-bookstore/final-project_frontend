import BookCard from '../../components/BookCard';
import { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import CartBtn from '../../components/CartBtn';
import DeleteBtnAdmin from '../../components/DeleteBtnAdmin';
import DeleteBook from '../../components/DeleteBook';
import UpdateBtnAdmin from '../../components/UpdateBtnAdmin';
import UpdateBook from '../../components/UpdateBook';
import Pagination from '../../components/Pagination';

export default function SearchResult() {
  const {
    user,
    booksToGenre,
    setBooksToGenre,
    bookToUpdate,
    bookToDelete,
    currentPage,
    setCurrentPage,
    booksPerPage,
  } = useContext(Context);
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
            setCurrentPage(1);
          }
        }
      } catch (error) {
        //
      }
    }
    bookSearch();
  }, [ourUrl]);

  // get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const sortedBooks = booksToGenre.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <div className='books-container'>
        {currentBooks.map((book) => (
          <div key={book._id}>
            <BookCard book={book} />
            <CartBtn book={book} />
            {user?.role === 'admin' && <UpdateBtnAdmin book={book} />}
            {user?.role === 'admin' && <DeleteBtnAdmin book={book} />}
            {bookToUpdate?._id === book._id && <UpdateBook book={book} />}
            {bookToDelete?._id === book._id && <DeleteBook book={book} />}
          </div>
        ))}
      </div>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={booksToGenre.length}
      />
    </>
  );
}
