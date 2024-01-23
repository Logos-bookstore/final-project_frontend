import { useContext } from 'react';
import { Context } from '../context/Context';

export default function DeleteBtnAdmin({ book }) {
  const { bookToDelete, setBookToDelete } = useContext(Context);
  const handleBookToDel = () =>
    setBookToDelete(bookToDelete === null ? book : null);

  return <button className='deleteBtnAdmin-button' onClick={handleBookToDel}>delete book</button>;
}
