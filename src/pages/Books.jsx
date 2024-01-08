import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Context } from '../context/Context';
import BooksDisplay from '../components/BooksDisplay';
import Pagination from '../components/Pagination';

export default function Books() {
  const [genres, setGenres] = useState([]);
  const { books, setBooks } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const { currentPage, setCurrentPage } = useContext(Context);
  const [booksPerPage] = useState(6);
  const { genreLinkActive, setGenreLinkActive } = useContext(Context);
  const {searchActive, setSearchActive} = useContext(Context);

  useEffect(() => {
    async function getGenres() {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_GENRES}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
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
    if(!searchActive) {
      async function fetchBooks() {
      try {
        const response = await fetch(`${import.meta.env.VITE_FETCH_ALL_BOOKS}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setBooks(data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks();
    }
  }, []);

  // get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Books</h2>
      <div className='genres-container'>
        {genres.map((genre) => {
          return (
            <h3 key={genre._id} onClick={() => {setGenreLinkActive(true); setSearchActive(false)}}>
              <NavLink to={`/books/${genre.genre}`} state={genre.genre}>
                {genre.genre}
              </NavLink>
            </h3>
          );
        })}
      </div>
      {!genreLinkActive && !searchActive ? (
        <>
          <BooksDisplay books={currentBooks} loading={loading} />
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            paginate={paginate}
          />
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}
