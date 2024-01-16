import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useParams } from 'react-router-dom';
import CartBtn from '../components/CartBtn';
import { ReviewStars } from '../components/ReviewStars';

export default function SingleBook() {
  const [reviews, setReviews] = useState(null);
  const [singleBook, setSingleBook] = useState(null);
  const { id } = useParams();
  //console.log(id);

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
      const res = await fetch(`${import.meta.env.VITE_SINGLE_BOOK}/${id}`);
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

  return (
    <>
      {singleBook && (
        <div>
          <div>
            <BookCard book={singleBook} />
            <CartBtn book={singleBook} />
          </div>
          <h2>{singleBook.title}</h2>
          <p>{singleBook.author}</p>
          <h3>Details</h3>
          <p>
            Publisher: <span>{singleBook.publisher}</span>
          </p>
          <p>
            Year: <span>{singleBook.year}</span>
          </p>
          <p>
            ISBN: <span>{singleBook.ISBN}</span>
          </p>
          <h3>Book description</h3>
          <p>{singleBook.description}</p>
          <h3>Reviews</h3>
          <div>
            {reviews &&
              reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <h3>{review?.userId?.firstName}</h3>
                    <ReviewStars rating={review.rating} />
                    <p>{review?.text}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
