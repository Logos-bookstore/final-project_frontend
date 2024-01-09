// CHANGE TO OIN VERSION !!

import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useParams } from 'react-router-dom';

export default function SingleBook() {
  const [reviews, setReviews] = useState(null);
  const [singleBook, setSingleBook] = useState(null);
  const { id } = useParams();
  console.log(id);

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
        console.log(data.data);
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
          <BookCard book={singleBook} />

          <h3>Book description</h3>
          <p>{singleBook.description}</p>
          <h3>Reviews</h3>
          <div>
            {reviews &&
              reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <h3>{review?.userId?.firstName}</h3>
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
