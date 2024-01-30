import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { Context } from '../../context/Context';
import './checkout.css'

export default function Checkout() {
  const {
    user,
    totalPrice,
    setTotalPrice,
    setShoppingCart,
    shoppingCart,
    setOrderReceived,
  } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadCart() {
      let cartArray = [];
      let price = 0;
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        const promises = cart.map((id) => booksById(id.split(' ')[0]));
        cartArray = await Promise.all(promises);
        setShoppingCart(cartArray.filter((item) => item)); // Filter out undefined items
      }
      /*for(let i = 0; i < cartArray.length; i++) {
                price += cartArray[i].price;
            };*/
      let quantities = cart.map((q) => q.split(' ')[1]);
      for (let i = 0; i < cartArray.length; i++) {
        price += cartArray[i].price * quantities[i];
      }
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
        console.error('Error fetching book data:', error);
      }
    }

    loadCart();
  }, []);

  const handleBuy = async () => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let quantities = cart.map((q) => q.split(' ')[1]);

      let date = new Date();
      let year = date.getFullYear();
      let day = date.getDate();
      let month = date.getMonth();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let bookIds = [];

      for (let i = 0; i < shoppingCart.length; i++) {
        bookIds.push(shoppingCart[i]._id);
      }
      let order = {
        date: `${day}.${month + 1}.${year} - ${hour}:${minutes}`,
        books: bookIds,
        quantity: quantities,
        totalPrice: totalPrice,
        userId: user._id,
      };

      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_PLACE_ORDER}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify({ order: order }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrderReceived(data.message);
            setShoppingCart([]);
            localStorage.removeItem('cart');
            navigate('/thankyou');
          }
        }
      }
    } catch (error) {
      //
    }
  };

  return (
    <div className='checkout-container-complete'>
      {!user?.address ? (
        <div className='checkout-page-container'>
          <Form update='Add Your Address'>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='street'>
                Street
              </label>
              <input
                className='checkout-input'
                type='text'
                name='street'
                id='street'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='zip'>
                Zip Code
              </label>
              <input
                className='checkout-input'
                type='text'
                name='zip'
                id='zip'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='city'>
                City
              </label>
              <input
                className='checkout-input'
                type='text'
                name='city'
                id='city'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='country'>
                Country
              </label>
              <input
                className='checkout-input'
                type='text'
                name='country'
                id='country'
              />
            </div>
          </Form>
          <div className='checkout-totalPrice-div'>
            <p className='checkout-totalPrice'>Total Price: {totalPrice} €</p>
          </div>
        </div>
      ) : (
        <div className='checkout-page-container'>
          <div className='checkout-address'>
            <h3 className='checkout-address-p'>Delivery Address</h3>
            <p className='checkout-address-p'>{user.address.street}</p>
            <p className='checkout-address-p'>{user.address.zip}</p>
            <p className='checkout-address-p'>{user.address.city}</p>
            <p className='checkout-address-p'>{user.address.country}</p>
          </div>
          <Form update='Update Your Address'>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='street'>
                Street
              </label>
              <input
                className='checkout-input'
                type='text'
                name='street'
                id='street'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='zip'>
                Zip Code
              </label>
              <input
                className='checkout-input'
                type='text'
                name='zip'
                id='zip'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='city'>
                City
              </label>
              <input
                className='checkout-input'
                type='text'
                name='city'
                id='city'
              />
            </div>
            <div className='checkout-container'>
              <label className='checkout-label' htmlFor='country'>
                Country
              </label>
              <input
                className='checkout-input'
                type='text'
                name='country'
                id='country'
              />
            </div>
          </Form>
          <div className='checkout-totalPrice-div'>
            <p className='checkout-totalPrice'>Total Price: {totalPrice} €</p>
          </div>
          <div className='checkout-buy-now-div'>
            <button className='checkout-buy-now' onClick={handleBuy}>
              Buy now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
