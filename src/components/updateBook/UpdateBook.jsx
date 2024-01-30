import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import CombinedName from '../CombinedName';
import './updateBook.css';

export default function UpdateBook({ book }) {
  const { setBookToUpdate } = useContext(Context);
  const [updateMSG, setUpdateMSG] = useState('');

  const handleCancel = () => setBookToUpdate(null);

  const handleNewBookImg = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (token) {
      if (e.target?.image?.value) {
        fetch(`${import.meta.env.VITE_UPDATE_BOOK}/${book._id}`, {
          method: 'PATCH',
          headers: { token: token },
          body: new FormData(e.target),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setUpdateMSG(res.message);
              setTimeout(() => {
                const refreshPage = () => window.location.reload(false);
                setUpdateMSG('');
                refreshPage();
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const updateBook = (e) => {
    e.preventDefault();
    let updatedBook = {
      title: e.target.title.value,
      author: e.target.combinedName.value,
      year: Number(e.target.year.value),
      publisher: e.target.publisher.value,
      genre: e.target.genre.value,
      description: e.target.description.value,
      pages: Number(e.target.pages.value),
      price: Number(e.target.price.value),
      ISBN: e.target.isbn.value,
    };

    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_UPDATE_BOOK}/${book._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', token: token },
        body: JSON.stringify(updatedBook),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setUpdateMSG(res.message);
            setTimeout(() => {
              const refreshPage = () => window.location.reload(false);
              setBookToUpdate(null);
              setUpdateMSG('');
              refreshPage();
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='updateBook-container'>
      {updateMSG && <p className='updateBook-msg'>{updateMSG}</p>}
      <>
        <form className='updateBook-img-form' onSubmit={handleNewBookImg}>
          <legend className='updateBook-legend'>Upload new book image</legend>
          {/* <label htmlFor='image'>Image</label> */}
          <input type='file' name='image' id='image' />
          <div className='updateBook-btns-container'>
            <button className='updateBook-btn' onClick={handleCancel}>
              Cancel
            </button>
            <button className='updateBook-btn'>Send</button>
          </div>
        </form>

        <form className='updateBook-details-form' onSubmit={updateBook}>
          <legend className='updateBook-legend'>Update book details</legend>
          <div>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' id='title' />
          </div>
          <CombinedName />
          <div>
            <label htmlFor='year'>Year</label>
            <input type='number' name='year' id='year' />
          </div>
          <div>
            <label htmlFor='publisher'>Publisher</label>
            <input type='text' name='publisher' id='publisher' />
          </div>
          <div>
            <label htmlFor='genre'>Genre</label>
            <input type='text' name='genre' id='genre' />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              cols='23'
              rows='10'
            ></textarea>
          </div>
          <div>
            <label htmlFor='pages'>Number of pages</label>
            <input type='number' step='any' name='pages' id='pages' />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input type='number' step='any' name='price' id='price' />
          </div>
          <div>
            <label htmlFor='isbn'>ISBN</label>
            <input type='text' name='isbn' id='isbn' />
          </div>
          <div className='updateBook-btns-container'>
            <button className='updateBook-btn' onClick={handleCancel}>
              Cancel
            </button>
            <button className='updateBook-btn'>Send</button>
          </div>
        </form>
      </>
    </div>
  );
}
