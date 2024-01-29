import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Context } from '../../context/Context';
import './books.css';

export default function Books() {
  const [genres, setGenres] = useState([]);
  const { hideUpdateDeleteBookForms, activeGenreLink, setActiveGenreLink } =
    useContext(Context);

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(`${import.meta.env.VITE_GENRES}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setGenres(data.data);
          }
        }
      } catch (error) {
        //
      }
    }
    getGenres();
  }, []);

  const sortedGenres = genres.sort((a, b) => a.genre.localeCompare(b.genre));

  return (
    <>
      <div className='books-genres-container'>
        {sortedGenres.map((genre) => {
          return (
            <h3
              className={
                activeGenreLink === genre.genre
                  ? 'books-active books-genre-name'
                  : 'books-genre-name'
              }
              key={genre._id}
              onClick={() => setActiveGenreLink(genre.genre)}
            >
              <NavLink
                to={`/books/genre/${genre.genre.split(' ').join('_')}`}
                state={genre.genre}
                onClick={hideUpdateDeleteBookForms}
              >
                {genre.genre}
              </NavLink>
            </h3>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
