import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import CartBtn from '../../components/CartBtn';
import { Context } from '../../context/Context';
import DeleteBtnAdmin from '../../components/DeleteBtnAdmin';
import DeleteBook from '../../components/DeleteBook';
import UpdateBtnAdmin from '../../components/UpdateBtnAdmin';
import UpdateBook from '../../components/UpdateBook';
import Pagination from '../../components/Pagination';

export default function Genre() {
  const { state } = useLocation();
  const {
    booksToGenre,
    setBooksToGenre,
    user,
    bookToUpdate,
    bookToDelete,
    currentPage,
    setCurrentPage,
    booksPerPage,
  } = useContext(Context);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BOOKS_ONE_GENRE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ genre: state }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCurrentPage(1);
          setBooksToGenre(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [state]);

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
        {currentBooks.map((book) => {
          return (
            <div className='books-book' key={book._id}>
              <BookCard book={book} />
              <CartBtn book={book} />
              {user?.role === 'admin' && <UpdateBtnAdmin book={book} />}
              {user?.role === 'admin' && <DeleteBtnAdmin book={book} />}
              {bookToUpdate?._id === book._id && <UpdateBook book={book} />}
              {bookToDelete?._id === book._id && <DeleteBook book={book} />}
            </div>
          );
        })}
      </div>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={booksToGenre.length}
      />
    </>
  );
}
