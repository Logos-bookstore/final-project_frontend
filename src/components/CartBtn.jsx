import { json } from "react-router-dom";

export default function CartBtn({book, singleBook}) {
  const handleCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart)
    if(cart) {
      if(book) {
        cart = [...cart, book._id];
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart = [...cart, singleBook._id];
        localStorage.setItem("cart", JSON.stringify(cart));
      };
    } else {
      if(book) {
        let cart = [book._id];
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let cart = [singleBook._id];
        localStorage.setItem("cart", JSON.stringify(cart));
      };
    };
  };
  return <button onClick={handleCart}>add to cart</button>;
}




//ARRAY of objects to localstorage