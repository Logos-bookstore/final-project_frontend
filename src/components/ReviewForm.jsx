import { useContext, useState } from 'react';
import { Context } from '../context/Context';

export default function ReviewForm({
  book,
  setBookToReview,
  setReviewsChange,
  userReviews,
}) {
  const { user } = useContext(Context);
  const [ratingError, setRatingError] = useState('');
  const exisitingReview = userReviews.find((rev) => rev.book === book._id);

  const handleAddReview = async (e) => {
    e.preventDefault();
    let newReview;
    if (e.target.review.value) {
      newReview = {
        book: book._id,
        text: e.target.review.value,
        rating: Number(e.target.rating.value),
        userId: user._id,
      };
    } else {
      newReview = {
        book: book._id,
        rating: Number(e.target.rating.value),
        userId: user._id,
      };
    }

    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const res = await fetch(`${import.meta.env.VITE_ADD_REVIEW}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify(newReview),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setBookToReview('');
            setReviewsChange(true);
          } // maybe add Toaster for 'review submitted successfully' ?
          else {
            setRatingError(data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handler to make rating error MSG disappear again:
  const handleErrorOnFocus = () => {
    if (ratingError !== '') setRatingError('');
  };

  const handleEditReview = async (e) => {
    e.preventDefault();
    let editedReview;
    if (e.target?.review?.value && e.target?.rating?.value) {
      editedReview = {
        text: e.target.review.value,
        rating: Number(e.target.rating.value),
      };
    } else if (e.target?.review?.value) {
      editedReview = { text: e.target.review.value };
    } else if (e.target?.rating?.value) {
      editedReview = { rating: Number(e.target.rating.value) };
    }

    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reviewToEdit = userReviews.find((rev) => rev.book === book._id);
        const res = await fetch(
          `${import.meta.env.VITE_EDIT_REVIEW}/${reviewToEdit._id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', token: token },
            body: JSON.stringify(editedReview),
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success) setBookToReview('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) =>
        exisitingReview ? handleEditReview(e) : handleAddReview(e)
      }
    >
      <p>{exisitingReview ? 'New rating' : 'Your rating'}</p>
      {ratingError !== '' && <p>{ratingError}</p>}
      <div className='rating-options-container'>
        <div>
          <input
            type='radio'
            name='rating'
            id='1'
            value='1'
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='1'>1</label>
        </div>
        <div>
          <input
            type='radio'
            name='rating'
            id='2'
            value='2'
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='2'>2</label>
        </div>
        <div>
          <input
            type='radio'
            name='rating'
            id='3'
            value='3'
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='3'>3</label>
        </div>
        <div>
          <input
            type='radio'
            name='rating'
            id='4'
            value='4'
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='4'>4</label>
        </div>
        <div>
          <input
            type='radio'
            name='rating'
            id='5'
            value='5'
            onClick={handleErrorOnFocus}
          />
          <label htmlFor='5'>5</label>
        </div>
      </div>

      <textarea
        name='review'
        id='review'
        cols='30'
        rows='4'
        placeholder={
          exisitingReview
            ? 'write your new review here'
            : 'write your review here'
        }
      ></textarea>
      <p onClick={() => setBookToReview('')} className='cancel-review-btn'>
        Cancel
      </p>
      <button>Send</button>
    </form>
  );
}
