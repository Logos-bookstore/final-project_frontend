import { useEffect, useState } from "react";

export default function Cart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function loadCart() {
            let cartArray = [];
            let price = 0;
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) {
                const promises = cart.map(id => booksById(id));
                cartArray = await Promise.all(promises);
                setShoppingCart(cartArray.filter(item => item)); // Filter out undefined items
                
            }
            for(let i = 0; i < cartArray.length; i++) {
                price += cartArray[i].price;
            };
            setTotalPrice(price.toFixed(2));
        }

        async function booksById(id) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BOOK_BY_ID}${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        return data.data;
                    }
                }
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        }

        loadCart();
    }, []);

    const handleDeleteItem = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart) {
            setShoppingCart(prev => prev.filter(item => item._id !== id));
            let toSubtract = shoppingCart.find(item => item._id === id);
            setTotalPrice(prev => (prev -= toSubtract.price).toFixed(2));
            let updatedCart = cart.filter(item => item !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    return (
        <>
            <h2>Cart</h2>
            <div>
                {shoppingCart.length > 0 ? (
                    shoppingCart.map((item, index) => (
                        <div key={index}>
                            <img src={item?.image?.thumbnail} alt="cover" />
                            <h2>{item?.title}</h2>
                            <h3>{item?.author}</h3>
                            <p>{item?.price}</p>
                            <button onClick={() => handleDeleteItem(item._id)}>Remove from Cart</button>
                        </div>
                    ))
                ) : (
                    <div>Your cart is empty.</div>
                )}
            </div>
            <div>Total Price: {totalPrice}</div>
        </>
    );
};







