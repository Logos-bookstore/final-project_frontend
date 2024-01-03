import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Context } from '../context/Context';

export default function Books() {
  const [genres, setGenres] = useState([]);
  const { books, setBooks } = useContext(Context);

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(`${import.meta.env.VITE_GENRES}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data);
            setGenres(data.data);
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

  return (
    <>
      <h2>Books</h2>
      <div>
        {genres.map((genre) => {
          return (
            <>
              <h3 key={genre._id}>
                <NavLink to={`/books/${genre.genre}`} state={genre.genre}>
                  {genre.genre}
                </NavLink>
              </h3>
            </>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
