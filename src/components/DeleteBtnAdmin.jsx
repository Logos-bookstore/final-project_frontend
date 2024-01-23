import { useContext } from 'react';
import { Context } from '../context/Context';

export default function DeleteBtnAdmin({ book }) {
  const { bookToDelete, setBookToDelete, setBookToUpdate } =
    useContext(Context);
  const handleBookToDel = () => {
    setBookToUpdate(null);
    setBookToDelete(bookToDelete === null ? book : null);
  };

  return (
    <button className='deleteBtnAdmin-button' onClick={handleBookToDel}>
      delete book
    </button>
  );
}
