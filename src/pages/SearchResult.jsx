import BookCard from '../components/BookCard';
import { useContext } from 'react';
import { Context } from '../context/Context';

export default function SearchResult() {
    const {booksToGenre} = useContext(Context);
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