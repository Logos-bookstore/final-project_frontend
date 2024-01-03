import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Context } from '../context/Context';
import BookDisplay from '../components/BookDisplay';
import Pagination from '../components/Pagination';

export default function Books() {
  const { books, setBooks } = useContext(Context);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const { genreLinkActive, setGenreLinkActive } = useContext(Context);

  useEffect(() => {
    async function getGenres() {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_GENRES}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data);
            setGenres(data.data);
            setLoading(false);
          }
        }
      } catch (error) {
        //
      }
    }
    getGenres();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${import.meta.env.VITE_FETCH_ALL_BOOKS}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data);
            setBooks(data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks();
  }, []);
  console.log(books);

  // get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  console.log(currentBooks);
  console.log(currentPage);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Books</h2>
      <div className='genres-container'>
        {genres.map((genre) => {
          return (
            <h3 key={genre._id} onClick={() => setGenreLinkActive(true)}>
              <NavLink to={`/books/${genre.genre}`} state={genre.genre}>
                {genre.genre}
              </NavLink>
            </h3>
          );
        })}
      </div>
      {!genreLinkActive && (
        <>
          <BookDisplay books={currentBooks} loading={loading} />
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            paginate={paginate}
          />
        </>
      )}
      <Outlet />
    </>
  );
}
