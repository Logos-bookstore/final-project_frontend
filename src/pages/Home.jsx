import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [randomBook, setRandomBook] = useState([]);
    useEffect(() => {
        async function random() {
            try {
                const response = await fetch(`${import.meta.env.VITE_RANDOM_BOOK}`);
                if(response.ok) {
                    const data = await response.json();
                    if(data.success) setRandomBook(data.data);
                }
            } catch (error) {
                //
            }
        };
        random();
    }, []);
    const navigate = useNavigate();
    const handleGoToDetailsPage = () => {
        navigate(`/books/singlebook/${randomBook._id}`); 
    };
    return (
        <>
            <h1>Bookstore Name</h1>
           <img src={randomBook?.image?.thumbnail} alt="cover" onClick={handleGoToDetailsPage}/>
        </>
    );
};