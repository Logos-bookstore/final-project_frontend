import { useContext } from 'react';
import { Context } from '../context/Context';

export default function CartBtn({ book, singleBook }) {
  const { setBookToUpdate, setBookToDelete } = useContext(Context);

  const handleCart = () => {
    setBookToUpdate(null);
    setBookToDelete(null);
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
  return <button className='cartBtn-btn' onClick={handleCart}>add to cart</button>;
}
