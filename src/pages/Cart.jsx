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
                const promises = cart.map(id => booksById(id.split(' ')[0]));
                cartArray = await Promise.all(promises);
                setShoppingCart(cartArray.filter(item => item)); // Filter out undefined items
                
            }
            for(let i = 0; i < cartArray.length; i++) {
                price += cartArray[i]?.price;
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

        let oldCart = JSON.parse(localStorage.getItem('cart'));
        if(oldCart) {
            let newCart = oldCart.map(bookId => bookId = `${bookId.slice(0, bookId.indexOf(' '))} ${1}`);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }, []);

    const handleDeleteItem = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart) {
            setShoppingCart(prev => prev.filter(item => item._id !== id));

            let findId = cart.find(bookId => bookId.startsWith(id)).split(' ');
            let toSubtract = shoppingCart.find(item => item._id === id);
            setTotalPrice(prev => (prev -= toSubtract.price * findId[1]).toFixed(2));

            let updatedCart = cart.filter(item => !item.startsWith(id));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    const handleGoToCashier = () => {
        navigate('/checkout');
    };

    const handleQuantity = (e, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            let findId = cart.find(bookId => bookId.startsWith(id)).split(' ');
            let qty = parseInt(e.target.value);
            let index = cart.indexOf(cart.find(bookId => bookId.startsWith(id)));
            cart.splice(index, 1, `${findId[0]} ${qty}`);
            localStorage.setItem('cart', JSON.stringify(cart));

            let price = 0;
            let quantities = cart.map(q => q.split(' ')[1])
            for(let i = 0; i < quantities.length; i++) {
                price += quantities[i] * shoppingCart[i].price;
            }
            setTotalPrice(price.toFixed(2));
        }
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
                                <label htmlFor="quantity">Qty</label>
                                <select onChange={(e) => handleQuantity(e, item._id)} name="quantity" id="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
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







