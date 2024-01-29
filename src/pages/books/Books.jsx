import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Books() {
  const [genres, setGenres] = useState([]);
  const { hideUpdateDeleteBookForms } = useContext(Context);

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
      <div className='genres-container'>
        {genres.map((genre) => {
          return (
            <h3 className='books-title' key={genre._id}>
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
