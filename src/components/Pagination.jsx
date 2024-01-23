export default function Pagination({ booksPerPage, totalBooks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className='pagination-container'>
        {pageNumbers.map((number) => (
          <li className="pagination-li" key={number} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}
