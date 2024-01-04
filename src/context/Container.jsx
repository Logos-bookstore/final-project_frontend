import { useEffect, useState } from 'react';
import { Context } from './Context';

export default function Container({ children }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genreLinkActive, setGenreLinkActive] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      async function verify() {
        try {
          const response = await fetch(`${import.meta.env.VITE_VERIFY_TOKEN}`, {
            method: 'GET',
            headers: { token: token },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data);
            }
          }
        } catch (error) {
          //
        }
      }

      verify();
    }
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          user,
          setUser,
          books,
          setBooks,
          currentPage,
          setCurrentPage,
          genreLinkActive,
          setGenreLinkActive,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}
