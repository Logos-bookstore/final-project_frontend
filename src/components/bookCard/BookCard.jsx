import { useNavigate } from 'react-router-dom';
import { ReviewStars } from '../ReviewStars';
import './bookCard.css';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleGoToDetailsPage = () => {
    const bookTitle = book.title.split(' ').join('_');
    navigate(`/books/${bookTitle}/${book._id}`);
  };

  return (
    <div
      key={book?._id}
      onClick={handleGoToDetailsPage}
      className='bookCard-container'
    >
      <div className='bookCard-cover-container'>
        <img className='bookCard-cover' src={book?.image?.thumbnail} alt='' />
      </div>
      <h2 className='bookCard-title'>
        {book?.title.split(' ').length < 5
          ? book?.title
          : book?.title.split(' ').slice(0, 4).join(' ')}
        {book?.title.split(' ').length > 4 ? '...' : ''}
      </h2>
      <h3 className='bookCard-author'>{book?.author}</h3>
      <ReviewStars rating={book?.avgRating} />
      <p className='bookCard-price'>{book?.price} €</p>
      {book?.home && (
        <p className='bookCard-description'>
          {book?.description.split(' ').slice(0, 10).join(' ')}...
        </p>
      )}
    </div>
  );
}
