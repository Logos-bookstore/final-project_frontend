import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './deleteBook.css';

export default function DeleteBook({ book }) {
  const { setBookToDelete, updateSuccess, setUpdateSuccess } =
    useContext(Context);
  const [deleteMSG, setDeleteMSG] = useState('');

  const handleDeleteMode = () => setBookToDelete(null);

  const deleteBook = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_DELETE_BOOK}/${book._id}`, {
        method: 'DELETE',
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setDeleteMSG(res.message);

            setTimeout(() => {
              setBookToDelete(null);
              setDeleteMSG('');
              setUpdateSuccess(updateSuccess ? false : true);
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='deleteBook-container'>
      {deleteMSG && <p className='update-delete-book-msg'>{deleteMSG}</p>}

      <p>Are you sure you want to remove this book from the shop's database?</p>
      <div className='deleteBook-btns-container'>
        {/* deactivated to avoid accidental book removal from the DB */}
        <button className='btn-bronze admin-btn-small' onClick={deleteBook}>
          Yes
        </button>
        <button
          className='btn-steelblue admin-btn-small'
          onClick={handleDeleteMode}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
