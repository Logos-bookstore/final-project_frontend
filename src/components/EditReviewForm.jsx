export default function EditReviewForm({ book, setBookToReview, userReviews }) {
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
        //const reviewId = reviewToEdit._id;
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
    <form onSubmit={(e) => handleEditReview(e)}>
      <p>New rating</p>
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
        placeholder='write your new review here'
      ></textarea>
      <p onClick={() => setBookToReview('')} className='cancel-review-btn'>
        Cancel
      </p>
      <button>Send</button>
    </form>
  );
}
