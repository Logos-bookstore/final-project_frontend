import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import CombinedName from './CombinedName';

export default function UpdateBook({ book }) {
  const { setBookToUpdate } = useContext(Context);
  const [updateMSG, setUpdateMSG] = useState('');

  const handleCancel = () => setBookToUpdate(null);

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
    <>
      {updateMSG && <p>{updateMSG}</p>}
      <form onSubmit={updateBook}>
        <fieldset>
          <legend>Update a book</legend>
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
              cols='30'
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
          <div>
            <button>send</button>
            <button onClick={handleCancel}>cancel</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
