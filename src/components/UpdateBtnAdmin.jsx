import { useContext } from 'react';
import { Context } from '../context/Context';

export default function UpdateBtnAdmin({ book }) {
  const { bookToUpdate, setBookToUpdate, setBookToDelete } =
    useContext(Context);

  const handleBookToUpdate = () => {
    setBookToDelete(null);
    setBookToUpdate(bookToUpdate === null ? book : null);
  };

  return <button onClick={handleBookToUpdate}>update book</button>;
}
