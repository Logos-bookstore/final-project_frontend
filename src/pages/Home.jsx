import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export default function Home() {
    const [randomBook, setRandomBook] = useState({});
    useEffect(() => {
        async function random() {
            try {
                const response = await fetch(`${import.meta.env.VITE_RANDOM_BOOK}`);
                if(response.ok) {
                    const data = await response.json();
                    if(data.success) setRandomBook({...data.data, home: true});
                }
            } catch (error) {
                //
            }
        };
        random();
    }, []);
    return (
        <>
            <h1 className="home-name">Bookstore Name</h1>
            <p className="home-p-one">Looking for a good read?</p>
            <p className="home-p-two">Try this</p>
           <BookCard book={randomBook}/>
        </>
    );
};