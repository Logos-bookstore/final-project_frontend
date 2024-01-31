import { useContext } from 'react';
import { Context } from '../context/Context';

export default function CartBtn({ book, singleBook }) {
  const { hideUpdateDeleteBookForms } = useContext(Context);

  const handleCart = () => {
    hideUpdateDeleteBookForms();
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      if (book) {
        cart = [...cart, `${book._id} ${1}`];
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart = [...cart, `${singleBook._id} ${1}`];
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } else {
      if (book) {
        let cart = [`${book._id} ${1}`];
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart = [`${singleBook._id} ${1}`];
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  };
  return (
    <button className='primary-btn' onClick={handleCart}>
      Add to cart
    </button>
  );
}
