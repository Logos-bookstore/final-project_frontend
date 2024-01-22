import { useEffect, useState } from "react";

export default function Home() {
    //const [randomBook, setRandomBook] = useState([]);
    useEffect(() => {
        async function random() {
            try {
                const response = await fetch('http://localhost:8000/api/books/random');
                if(response.ok) {
                    const data = await response.json();
                    if(data.success) console.log(data.data);
                }
            } catch (error) {
                //
            }
        };
        random();
    }, []);
    return (
        <>
            <h1>Home</h1>
        </>
    );
};