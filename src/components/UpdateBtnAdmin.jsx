import { useContext } from 'react';
import { Context } from '../context/Context';

export default function UpdateBtnAdmin({ book }) {
  const { bookToUpdate, setBookToUpdate } = useContext(Context);

  const handleBookToUpdate = () =>
    setBookToUpdate(bookToUpdate === null ? book : null);

  return <button onClick={handleBookToUpdate}>update book</button>;
}
