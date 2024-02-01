import { useEffect, useState } from 'react';
import BookCard from '../../components/bookCard/BookCard';
import './home.css';

export default function Home() {
  const [randomBook, setRandomBook] = useState();

  useEffect(() => {
    async function random() {
      try {
        const response = await fetch(`${import.meta.env.VITE_RANDOM_BOOK}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) setRandomBook({ ...data.data, home: true });
        }
      } catch (error) {
        //
      }
    }
    random();
  }, []);

  return (
    <div className='home-container'>
      <p className='home-p-one'>Looking for a good book?</p>
      <div className='home-grid'>
        <p className='home-p-two'>Try</p>
        <div className='home-book-container'>
          <BookCard book={randomBook} />
        </div>
      </div>
    </div>
  );
}
