import { useNavigate } from 'react-router-dom';
import { ReviewStars } from './ReviewStars';

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
      className='single-book-container'
    >
      <img className='bookCard-cover' src={book?.image?.thumbnail} alt='' />
      <h2 className='bookCard-title'>{book?.title}</h2>
      <h3 className='bookCard-author'>{book?.author}</h3>
      <ReviewStars rating={book?.avgRating} />
      <p className='bookCard-price'>{book?.price} €</p>
      {book?.home && (
        <p className='bookCard-description'>
          {book?.description.split(' ').slice(0, 15).join(' ')}...
        </p>
      )}
    </div>
  );
}
