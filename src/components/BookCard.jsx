import { useNavigate } from 'react-router-dom';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleGoToDetailsPage = () => {
    // FOR LATER --> add the TITLE to the URL as a 2nd dynamic PARAM ?
    /* const bookTitle = book.title.split(' ').join('-');
    navigate(`/singlebook/${bookTitle}`); */
    navigate(`/singlebook/${book._id}`);
  };

  return (
    <div key={book._id} className='single-book-container'>
      <img src={book.image.thumbnail} alt='' onClick={handleGoToDetailsPage} />
      <h2 onClick={handleGoToDetailsPage}>{book.title}</h2>
      <h3>
        {book.author.firstName} {book.author.lastName}
      </h3>
      <p>{book.year}</p>
      <p>{book.publisher}</p>
      <p>{book.price} €</p>
    </div>
  );
}
