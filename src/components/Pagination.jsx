import { useContext } from 'react';
import { Context } from '../context/Context';

export default function Pagination({ booksPerPage, totalBooks }) {
  const { setCurrentPage, hideUpdateDeleteBookForms } = useContext(Context);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  // change page
  const paginate = (pageNumber) => {
    hideUpdateDeleteBookForms();
    setCurrentPage(pageNumber);
  };

  return (
    <nav className='pagination-nav'>
      <ul className='pagination-container'>
        {pageNumbers.map((number) => (
          <li
            className='pagination-li'
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}
