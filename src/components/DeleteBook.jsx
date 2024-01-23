import { useContext, useState } from 'react';
import { Context } from '../context/Context';

export default function DeleteBook({ book }) {
  const { setBookToDelete } = useContext(Context);
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
              const refreshPage = () => window.location.reload(false);
              setBookToDelete(null);
              setDeleteMSG('');
              refreshPage();
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='deleteBook-container'>
      {deleteMSG && <p className='deleteBook-msg'>{deleteMSG}</p>}
      <p className='deleteBook-p'>Are you sure you want to remove this book from the shop's database?</p>
      <div className='deleteBook-deleteContainer'>
        {/* deactivated to avoid accidental book removal from the DB */}
        <button className='deleteBook-yes' /* onClick={deleteBook} */>yes</button>
        <button className='deleteBook-cancel' onClick={handleDeleteMode}>cancel</button>
      </div>
    </div>
  );
}
