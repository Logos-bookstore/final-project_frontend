import { useContext } from 'react';
import { Context } from '../context/Context';

export default function AddReviewForm({
  book,
  reviewExists,
  setReviewExists,
  setBookToReview,
}) {
  const { user } = useContext(Context);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const newReview = {
      book: book._id,
      text: e.target.review.value,
      rating: Number(e.target.rating.value),
      userId: user._id,
    };
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
            setReviewExists(reviewExists ? false : true);
            setBookToReview('');
          } // Toaster for 'review submitted successfully ?
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleAddReview(e)}>
      <p>Your rating</p>
      <div className='rating-options-container'>
        <div>
          <input type='radio' name='rating' id='1' value='1' />
          <label htmlFor='1'>1</label>
        </div>
        <div>
          <input type='radio' name='rating' id='2' value='2' />
          <label htmlFor='2'>2</label>
        </div>
        <div>
          <input type='radio' name='rating' id='3' value='3' />
          <label htmlFor='3'>3</label>
        </div>
        <div>
          <input type='radio' name='rating' id='4' value='4' />
          <label htmlFor='4'>4</label>
        </div>
        <div>
          <input type='radio' name='rating' id='5' value='5' />
          <label htmlFor='5'>5</label>
        </div>
      </div>

      <textarea
        name='review'
        id='review'
        cols='30'
        rows='4'
        placeholder='write your review here'
      ></textarea>
      <p onClick={() => setBookToReview('')} className='cancel-review-btn'>
        Cancel
      </p>
      <button>Send</button>
    </form>
  );
}
