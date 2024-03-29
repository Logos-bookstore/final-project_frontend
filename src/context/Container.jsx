import { useEffect, useState } from 'react';
import { Context } from './Context';

export default function Container({ children }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [searchResult, setSearchResult] = useState([]);
  const [booksToGenre, setBooksToGenre] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderReceived, setOrderReceived] = useState('');
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [menuIcon, setMenuIcon] = useState(false);
  const [bookToReview, setBookToReview] = useState(null);
  const [reviewBtn, setReviewBtn] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  const hideUpdateDeleteBookForms = () => {
    setBookToUpdate(null);
    setBookToDelete(null);
  };

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
          booksPerPage,
          searchResult,
          setSearchResult,
          booksToGenre,
          setBooksToGenre,
          totalPrice,
          setTotalPrice,
          shoppingCart,
          setShoppingCart,
          orderReceived,
          setOrderReceived,
          bookToDelete,
          setBookToDelete,
          bookToUpdate,
          setBookToUpdate,
          hideUpdateDeleteBookForms,
          menuIcon,
          setMenuIcon,
          bookToReview,
          setBookToReview,
          reviewBtn,
          setReviewBtn,
          updateSuccess,
          setUpdateSuccess,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}
