import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Books() {
  const [genres, setGenres] = useState([]);
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
  return (
    <>
      <h2>Books</h2>
      <div className='genres-container'>
        {genres.map((genre) => {
          return (
            <h3
              key={genre._id}
            >
              <NavLink
                to={`/books/genre/${genre.genre.split(' ').join('_')}`}
                state={genre.genre}
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
