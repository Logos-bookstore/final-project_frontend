import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

export default function Cart() {
    const navigate = useNavigate();
    const {user, totalPrice, setTotalPrice, shoppingCart, setShoppingCart} = useContext(Context);

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

    const handleGoToCashier = () => {
        navigate('/checkout');
    };

    return (
        <>
            <h2>Cart</h2>
            <div>
                {shoppingCart.length > 0 ? <>
                    {shoppingCart.map((item, index) => (
                        <div key={index}>
                            <img src={item?.image?.thumbnail} alt="cover" />
                            <h2>{item?.title}</h2>
                            <h3>{item?.author}</h3>
                            <p>{item?.price} €</p>
                            <button onClick={() => handleDeleteItem(item._id)}>Remove from Cart</button>
                        </div>
                    ))}<div>Total Price: {totalPrice} €</div>
                </> :
                    <div>Your cart is empty.</div>
                }
            </div>
            
            {
                (shoppingCart.length > 0 && user) && <button onClick={handleGoToCashier}>Buy</button>
            }
            {
                !user && <p>Please log in if you want to buy books or create an account.</p>
            }
        </>
    );
};







