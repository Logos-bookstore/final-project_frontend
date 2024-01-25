import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import FirstName from '../../components/FirstName';
import LastName from '../../components/LastName';
import Image from '../../components/Image';
import Upload from '../../components/Upload';
import Form from '../../components/Form';
import Email from '../../components/Email';
import Password from '../../components/Password';
import ReEnter from '../../components/ReEnter';
import CombinedName from '../../components/CombinedName';
import { NavLink, useNavigate } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm';

export default function Profile() {
  const { user, setUser } = useContext(Context);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  // states for writing/editing reviews:
  const [userReviews, setUserReviews] = useState([]);
  const [bookToReview, setBookToReview] = useState(null);
  const [reviewsChange, setReviewsChange] = useState(null); // to fetch reviews after submitting a review
  const [renderOrders, setRenderOrders] = useState(false);
  const [really, setReally] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [deleteOrder, setDeleteOrder] = useState('');
  const [updateItem, setUpdateItem] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      async function userOrders() {
        try {
          const response = await fetch(`${import.meta.env.VITE_USER_ORDERS}`, {
            method: 'GET',
            headers: { token: token },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUserOrders(data.data);
            }
          }
        } catch (error) {
          //
        }
      }
      userOrders();
      // fetch reviews by userId
      async function userReviews() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_REVIEWS_BY_USER_ID}`,
            {
              method: 'GET',
              headers: { token: token },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.success) setUserReviews(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      userReviews();
    }
  }, []);

  // fetch reviews again, whenever one gets submitted:
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      async function userReviews() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_REVIEWS_BY_USER_ID}`,
            {
              method: 'GET',
              headers: { token: token },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.success) setUserReviews(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      userReviews();
    }
  }, [reviewsChange]);

  async function uploadBook(e) {
    e.preventDefault();
    try {
      const book = new FormData(e.target);
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_UPLOAD_BOOK}`, {
          method: 'POST',
          headers: { token: token },
          body: book,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data.message);
          }
        }
      }
    } catch (error) {
      //
    }
  }
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_DELETE_USER}${user._id}`,
          { method: 'DELETE', headers: { token: token } }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(null);
            sessionStorage.removeItem('token');
            navigate('/deletedAccount');
          }
        }
      }
    } catch (error) {}
  };

  const handleEditProfile = () => {
    setRenderOrders(false);
    setShowBookForm(false);
    setReally(false);
    setShowEditProfile(showEditProfile ? false : true);
  };

  const handleOrderHistory = () => {
    setShowEditProfile(false);
    setShowBookForm(false);
    setReally(false);
    setRenderOrders(renderOrders ? false : true);
  };

  const handleBookForm = () => {
    setShowEditProfile(false);
    setRenderOrders(false);
    setReally(false);
    setShowBookForm(showBookForm ? false : true);
  };

  const showDeleteOption = () => {
    setShowEditProfile(false);
    setRenderOrders(false);
    setShowBookForm(false);
    setReally(true);
  };

  const handleDeleteOrder = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_DELETE_ORDER}${id}`,
          { method: 'DELETE', headers: { token: token } }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserOrders(data.data);
          }
        }
      }
    } catch (error) {
      //
    }
  };

  const handleDeleteItem = async (id, order) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_DELETE_ITEM_FROM_ORDER}${id}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', token: token },
            body: JSON.stringify({ id: order }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) setUserOrders(data.data);
        }
      }
    } catch (error) {
      //
    }
  };

  const handleUpdateQty = async (e, order, book) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_UPDATE_ITEM}${order}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', token: token },
            body: JSON.stringify({ qty: e.target.qty.value, book: book }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserOrders(data.data);
            setUpdateItem('');
          }
        }
      }
    } catch (error) {
      //
    }
  };

  return (
    <>
      {user?.image?.thumbnail && <img src={user?.image?.thumbnail} alt='' />}
      <h2>Welcome {user?.firstName}</h2>
      <h4>{user?.email}</h4>

      <p onClick={handleEditProfile}>Edit your profile</p>
      {showEditProfile && (
        <div>
          <Form update='Upload a Profile Image'>
            <Image />
          </Form>
          <Form update='Update Your First Name'>
            <FirstName />
          </Form>
          <Form update='Update Your Last Name'>
            <LastName />
          </Form>
          <Form update='Update Your Email'>
            <Email />
          </Form>
          <Form update='Update Your Password'>
            <Password />
            <ReEnter />
          </Form>
          <p onClick={() => setShowEditProfile(false)}>Cancel</p>
        </div>
      )}
      <div>
        <p onClick={handleOrderHistory}>
          Order history {userOrders.length === 0 && '(no orders yet)'}
        </p>
        {renderOrders &&
          userOrders.map((item) => {
            return (
              <div key={item._id}>
                <p>
                  <span>{item.date}</span>,{' '}
                  <span>Total Price: {item.totalPrice} €</span>
                </p>
                {deleteOrder === item._id ? (
                  <>
                    <div>
                      <p>Do you really want to delete this order?</p>
                    </div>
                    <div>
                      <button onClick={() => handleDeleteOrder(item._id)}>
                        Yes
                      </button>
                      <button onClick={() => setDeleteOrder('')}>No</button>
                    </div>
                  </>
                ) : (
                  <div>
                    <button onClick={() => setDeleteOrder(item._id)}>
                      Delete Order
                    </button>
                  </div>
                )}
                {item.books.map((book) => {
                  return (
                    <div className='order-item' key={book._id}>
                      <img
                        onClick={() =>
                          navigate(
                            `/books/${book.title.split(' ').join('_')}/${
                              book._id
                            }`
                          )
                        }
                        src={book?.image?.thumbnail}
                        alt='cover'
                      />
                      <p
                        onClick={() =>
                          navigate(
                            `/books/${book.title.split(' ').join('_')}/${
                              book._id
                            }`
                          )
                        }
                      >
                        "{book?.title}",{' '}
                      </p>
                      <p>{book?.author}, </p>
                      <p>{book?.price} €</p>
                      <p>
                        Qty:
                        {item?.quantity.find(
                          (qty) =>
                            item?.quantity.indexOf(qty) ===
                            item.books.indexOf(book)
                        )}
                      </p>
                      <button
                        onClick={() =>
                          setBookToReview(bookToReview === null ? book : null)
                        }
                      >
                        {userReviews.find((rev) => rev.book === book._id)
                          ? 'Edit your review'
                          : 'Write a review'}
                      </button>

                      {bookToReview?._id === book._id && (
                        <ReviewForm
                          book={book}
                          setBookToReview={setBookToReview}
                          setReviewsChange={setReviewsChange}
                          userReviews={userReviews}
                        />
                      )}
                      <div>
                        {updateItem === book._id ? (
                          <div>
                            <form
                              onSubmit={(e) =>
                                handleUpdateQty(e, item._id, book._id)
                              }
                            >
                              <select name='qty' id='qty'>
                                <option className='cart-option' value='1'>
                                  1
                                </option>
                                <option className='cart-option' value='2'>
                                  2
                                </option>
                                <option className='cart-option' value='3'>
                                  3
                                </option>
                                <option className='cart-option' value='4'>
                                  4
                                </option>
                                <option className='cart-option' value='5'>
                                  5
                                </option>
                                <option className='cart-option' value='6'>
                                  6
                                </option>
                                <option className='cart-option' value='7'>
                                  7
                                </option>
                                <option className='cart-option' value='8'>
                                  8
                                </option>
                                <option className='cart-option' value='9'>
                                  9
                                </option>
                                <option className='cart-option' value='10'>
                                  10
                                </option>
                              </select>
                              <button type='submit'>Submit</button>
                            </form>
                            <button onClick={() => setUpdateItem('')}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button onClick={() => setUpdateItem(book._id)}>
                              Update Qty
                            </button>
                          </div>
                        )}
                      </div>
                      <div>
                        {deleteItem === book._id ? (
                          <>
                            <div>
                              <p>
                                Do you really want to delete this item from your
                                order?
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  handleDeleteItem(book._id, item._id)
                                }
                              >
                                Yes
                              </button>
                              <button onClick={() => setDeleteItem('')}>
                                No
                              </button>
                            </div>
                          </>
                        ) : (
                          <div>
                            <button onClick={() => setDeleteItem(book._id)}>
                              Delete Item
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div>
        {user?.role === 'admin' && (
          <>
            <p onClick={handleBookForm}>Upload a book</p>
            {showBookForm && (
              <form onSubmit={uploadBook}>
                <fieldset>
                  <legend>Upload a Book</legend>
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
                  <Image />
                  <p onClick={() => setShowBookForm(false)}>Cancel</p>
                  <Upload />
                </fieldset>
              </form>
            )}
            <p>
              <NavLink to='/books/selection'>Edit book information</NavLink>
            </p>
            <p>
              <NavLink to='/books/selection'>
                Remove a book from assortment
              </NavLink>
            </p>
          </>
        )}
      </div>
      <div>
        {really ? (
          <>
            <div>
              <p>Do you really want to delete your account?</p>
            </div>
            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setReally(false)}>No</button>
            </div>
          </>
        ) : (
          <p onClick={showDeleteOption}>DELETE YOUR ACCOUNT</p>
        )}
      </div>
    </>
  );
}
