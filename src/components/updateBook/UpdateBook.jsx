import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './updateBook.css';

export default function UpdateBook({ book }) {
  const { setBookToUpdate, updateSuccess, setUpdateSuccess } =
    useContext(Context);
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
                setBookToUpdate(null);
                setUpdateMSGcover('');
                setUpdateSuccess(updateSuccess ? false : true);
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
                setBookToUpdate(null);
                setUpdateMSGbookInfo('');
                setUpdateSuccess(updateSuccess ? false : true);
              }, 2000);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className='updateBook-container'>
      <form className='updateBook-img-form' onSubmit={handleNewBookImg}>
        {updateMSGcover && (
          <p className='update-delete-book-msg'>{updateMSGcover}</p>
        )}
        <legend className='updateBook-legend'>Upload new book image</legend>
        <input type='file' name='image' id='image' onFocus={resetErrorMSGs} />
        <div className='updateBook-btns-container'>
          <button
            type='button'
            className='btn-steelblue admin-btn-small'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='btn-bronze admin-btn-small'
            onClick={resetErrorMSGs}
          >
            Send
          </button>
        </div>
      </form>

      <form className='updateBook-details-form' onSubmit={updateBook}>
        {updateMSGbookInfo && (
          <p className='update-delete-book-msg'>{updateMSGbookInfo}</p>
        )}
        <legend className='updateBook-legend'>Update book details</legend>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' onFocus={resetErrorMSGs} />
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
          <input type='number' name='year' id='year' onFocus={resetErrorMSGs} />
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
          <input type='text' name='genre' id='genre' onFocus={resetErrorMSGs} />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols='23'
            rows='4'
            onFocus={resetErrorMSGs}
          ></textarea>
        </div>
        <div>
          <label htmlFor='pages'>No. of pages</label>
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
          <button
            type='button'
            className='btn-steelblue admin-btn-small'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='btn-bronze admin-btn-small'
            onFocus={resetErrorMSGs}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
