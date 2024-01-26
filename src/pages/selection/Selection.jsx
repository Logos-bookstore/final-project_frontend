import { Context } from '../../context/Context';
import BooksDisplay from '../../components/BooksDisplay';
import Pagination from '../../components/Pagination';
import { useEffect, useContext } from 'react';

export default function Selection() {
  const { books, setBooks, currentPage, booksPerPage } = useContext(Context);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${import.meta.env.VITE_FETCH_ALL_BOOKS}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) setBooks(data.data);
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
  const sortedBooks = books.sort((a, b) =>
    a.author.split(' ').at(-1).localeCompare(b.author.split(' ').at(-1))
  );
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <BooksDisplay books={currentBooks} />
      <Pagination booksPerPage={booksPerPage} totalBooks={books.length} />
    </>
  );
}
