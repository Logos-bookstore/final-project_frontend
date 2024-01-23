import { useNavigate } from 'react-router-dom';
import { ReviewStars } from './ReviewStars';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleGoToDetailsPage = () => {
    // FOR LATER --> add the TITLE to the URL as a 2nd dynamic PARAM ?
    /* const bookTitle = book.title.split(' ').join('-');
    navigate(`/singlebook/${bookTitle}`); */
    navigate(`/books/singlebook/${book._id}`);
  };

  return (
    <div key={book?._id} className='single-book-container'>
      <img className='bookCard-cover' src={book?.image?.thumbnail} alt='' onClick={handleGoToDetailsPage} />
      <h2 className='bookCard-title' onClick={handleGoToDetailsPage}>{book?.title}</h2>
      <h3 className='bookCard-author'>{book?.author}</h3>
      <ReviewStars rating={book?.avgRating} />
      <p className='bookCard-price'>{book?.price} €</p>
      {book?.home && <p className='bookCard-description'>{book?.description.split(' ').slice(0, 15).join(' ')}...</p>}
    </div>
  );
}
