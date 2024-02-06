import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../../components/bookCard/BookCard';
import { useNavigate, useParams } from 'react-router-dom';
import CartBtn from '../../components/CartBtn';
import { ReviewStars } from '../../components/ReviewStars';
import DeleteBtnAdmin from '../../components/DeleteBtnAdmin';
import { Context } from '../../context/Context';
import UpdateBtnAdmin from '../../components/UpdateBtnAdmin';
import UpdateBook from '../../components/updateBook/UpdateBook';
import './singleBook.css';

export default function SingleBook() {
  const [reviews, setReviews] = useState(null);
  const [deleteMSG, setDeleteMSG] = useState('');
  const [singleBook, setSingleBook] = useState(null);
  const { user, bookToUpdate, bookToDelete, setBookToDelete, updateSuccess } =
    useContext(Context);
  const [showBookText, setShowBookText] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDeleteMode = () => setBookToDelete(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REVIEWS_SINGLE_BOOK}/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBook = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BOOK_BY_ID}${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) setSingleBook(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [updateSuccess]);

  const deleteBook = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_DELETE_BOOK}/${singleBook._id}`, {
        method: 'DELETE',
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setDeleteMSG(res.message);
            setTimeout(() => {
              navigate('/books/selection');
              setBookToDelete(null);
              setDeleteMSG('');
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {singleBook && (
        <div className='singleBook-page'>
          <div
            className='bookCard-and-btns-container'
            id='singleBook-reset-margin'
          >
            <BookCard book={singleBook} />
            <div className='cart-and-admin-btns-container'>
              <CartBtn book={singleBook} />
              {user?.role === 'admin' && <UpdateBtnAdmin book={singleBook} />}
              {user?.role === 'admin' && <DeleteBtnAdmin book={singleBook} />}
            </div>
          </div>
          <div className='singleBook-admin-forms'>
            {bookToUpdate?._id === singleBook._id && (
              <div id='singleBook-reset-margin-forms'>
                <UpdateBook book={singleBook} />
              </div>
            )}
            {bookToDelete?._id === singleBook._id && (
              <div id='singleBook-reset-margin-forms'>
                <div className='deleteBook-container'>
                  {deleteMSG && (
                    <p className='update-delete-book-msg'>{deleteMSG}</p>
                  )}

                  <p>
                    Are you sure you want to remove this book from the shop's
                    database?
                  </p>
                  <div className='deleteBook-btns-container'>
                    {/* deactivated to avoid accidental book removal from the DB */}
                    <button
                      className='btn-bronze admin-btn-small'
                      onClick={deleteBook}
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      className='btn-steelblue admin-btn-small'
                      onClick={handleDeleteMode}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='singleBook-details'>
            <h2 className='singleBook-title'>{singleBook.title}</h2>
            <p>by {singleBook.author}</p>
            <h3 className='singleBook-heading'>Details</h3>
            <p>
              <span className='singleBook-span'> Publisher:</span>{' '}
              {singleBook.publisher}
            </p>
            <p>
              <span className='singleBook-span'>Published: </span>
              {singleBook.year}
            </p>
            <p>
              <span className='singleBook-span'> Number of pages: </span>
              {singleBook?.pages}
            </p>
            <p>
              <span className='singleBook-span'>ISBN: </span>
              {singleBook.ISBN}
            </p>
            <h3 className='singleBook-heading'>Book description</h3>
            <p>
              {singleBook.description.split(' ').slice(0, 20).join(' ') + ' '}
              {showBookText ? (
                <>
                  <span>
                    {singleBook.description.split(' ').slice(20).join(' ') +
                      ' '}
                  </span>
                  <span
                    className='singleBook-show-hide-text'
                    onClick={() => setShowBookText(false)}
                  >
                    hide
                  </span>
                </>
              ) : (
                <>
                  <span>... </span>
                  <span
                    className='singleBook-show-hide-text'
                    onClick={() => setShowBookText(true)}
                  >
                    read more
                  </span>
                </>
              )}
            </p>
          </div>
          <div className='singleBook-reviews'>
            <h3 className='singleBook-heading'>Reviews</h3>
            {reviews.length === 0 && <p>No reviews yet...</p>}
            <div>
              {reviews &&
                reviews.map((review) => {
                  return (
                    <div key={review._id}>
                      <h3 className='singleBook-reviewer'>
                        {review?.userId?.firstName}
                      </h3>
                      <ReviewStars rating={review.rating} />
                      <p className='singleBook-review-text'>{review?.text}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
