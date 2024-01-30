import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import CombinedName from '../CombinedName';
import './updateBook.css';

export default function UpdateBook({ book }) {
  const { setBookToUpdate } = useContext(Context);
  const [updateMSGcover, setUpdateMSGcover] = useState('');
  const [updateMSGbookInfo, setUpdateMSGbookInfo] = useState('');

  const handleCancel = () => setBookToUpdate(null);
  const resetErrorMSGs = () => {
    setUpdateMSGcover('');
    setUpdateMSGbookInfo('');
  };

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
              setUpdateMSGcover(res.message);
              setTimeout(() => {
                const refreshPage = () => window.location.reload(false);
                setUpdateMSGcover('');
                refreshPage();
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setUpdateMSGcover('Please choose an image and try again.');
      }
    }
  };

  const updateBook = (e) => {
    e.preventDefault();
    const updatedBook = {
      title: e.target.title.value,
      author: e.target.author.value,
      year: Number(e.target.year.value),
      publisher: e.target.publisher.value,
      genre: e.target.genre.value,
      description: e.target.description.value,
      pages: Number(e.target.pages.value),
      price: Number(e.target.price.value),
      ISBN: e.target.isbn.value,
    };

    if (
      updatedBook.title === '' &&
      updatedBook.author === '' &&
      updatedBook.publisher === '' &&
      updatedBook.genre === '' &&
      updatedBook.description === '' &&
      updatedBook.ISBN === '' &&
      updatedBook.year === 0 &&
      updatedBook.pages === 0 &&
      updatedBook.price === 0
    ) {
      setUpdateMSGbookInfo(
        'Please enter the information you wish to update and try again.'
      );
    } else {
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
              setUpdateMSGbookInfo(res.message);
              setTimeout(() => {
                const refreshPage = () => window.location.reload(false);
                setBookToUpdate(null);
                setUpdateMSGbookInfo('');
                refreshPage();
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className='updateBook-container'>
      {updateMSGcover && <p className='updateBook-msg'>{updateMSGcover}</p>}
      <>
        <form className='updateBook-img-form' onSubmit={handleNewBookImg}>
          <legend className='updateBook-legend'>Upload new book image</legend>
          {/* <label htmlFor='image'>Image</label> */}
          <input type='file' name='image' id='image' onFocus={resetErrorMSGs} />
          <div className='updateBook-btns-container'>
            <button className='updateBook-btn' onClick={handleCancel}>
              Cancel
            </button>
            <button className='updateBook-btn' onClick={resetErrorMSGs}>
              Send
            </button>
          </div>
        </form>

        {updateMSGbookInfo && <p>{updateMSGbookInfo}</p>}
        <form className='updateBook-details-form' onSubmit={updateBook}>
          <legend className='updateBook-legend'>Update book details</legend>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='author'>Author</label>
            <input
              type='text'
              name='author'
              id='author'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='year'>Year</label>
            <input
              type='number'
              name='year'
              id='year'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='publisher'>Publisher</label>
            <input
              type='text'
              name='publisher'
              id='publisher'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='genre'>Genre</label>
            <input
              type='text'
              name='genre'
              id='genre'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              cols='23'
              rows='10'
              onFocus={resetErrorMSGs}
            ></textarea>
          </div>
          <div>
            <label htmlFor='pages'>Number of pages</label>
            <input
              type='number'
              step='any'
              name='pages'
              id='pages'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              step='any'
              name='price'
              id='price'
              onFocus={resetErrorMSGs}
            />
          </div>
          <div>
            <label htmlFor='isbn'>ISBN</label>
            <input type='text' name='isbn' id='isbn' onFocus={resetErrorMSGs} />
          </div>
          <div className='updateBook-btns-container'>
            <button className='updateBook-btn' onClick={handleCancel}>
              Cancel
            </button>
            <button className='updateBook-btn' onFocus={resetErrorMSGs}>
              Send
            </button>
          </div>
        </form>
      </>
    </div>
  );
}