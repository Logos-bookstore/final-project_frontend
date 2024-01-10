import { Context } from '../context/Context';
import BooksDisplay from '../components/BooksDisplay';
import Pagination from '../components/Pagination';
import { useEffect, useContext, useState } from 'react';

export default function Selection() {
    const { currentPage, setCurrentPage } = useContext(Context);
  const [booksPerPage] = useState(6);
  const { books, setBooks } = useContext(Context);
    useEffect(() => {
          async function fetchBooks() {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_FETCH_ALL_BOOKS}`
              );
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
      }, []);
    
      // get current books
      const indexOfLastBook = currentPage * booksPerPage;
      const indexOfFirstBook = indexOfLastBook - booksPerPage;
      const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    
      // change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <BooksDisplay books={currentBooks} />
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            paginate={paginate}
          />
        </>
    );
};