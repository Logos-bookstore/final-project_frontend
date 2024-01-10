import BookCard from '../components/BookCard';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

export default function SearchResult() {
    const {booksToGenre, query, setBooksToGenre} = useContext(Context);
    const queryString = new URLSearchParams(window.location.search);
  const setQueryString = () => {
    let result;
    for (const q of queryString) {
      console.log(q);
      result = q[1];
    }
    return result;
  };
  const ourUrl = setQueryString();
    useEffect(() => {
            async function bookSearch() {
                try {
                    const response = await fetch(
                      `${import.meta.env.VITE_BOOK_SEARCH}${ourUrl}`
                    );
                    if (response.ok) {
                      const data = await response.json();
                      if (data.success) {
                        setBooksToGenre(data.data);
                      }
                    }
                  } catch (error) {
                    //
                  }
            };
            bookSearch();
    }, [ourUrl]);
    return (
        <>
            <h4>Search Result:</h4>
            <div className="books-container">
                {booksToGenre.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </>
    );
};