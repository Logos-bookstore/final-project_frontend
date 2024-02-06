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
import toast, { Toaster } from 'react-hot-toast';
import './profile.css'

export default function Profile() {
  const { user, setUser, hideUpdateDeleteBookForms, bookToReview, setBookToReview, reviewBtn, setReviewBtn } = useContext(Context);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  // states for writing/editing reviews:
  const [userReviews, setUserReviews] = useState([]);
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
            toast.success('The upload of the book was successful!');
            e.target.reset();
            setShowBookForm(false);
          }
        } else {
          toast.error(
            'The upload of the book was unsuccessfull! Make sure to fill out all fields.'
          );
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
    <div className='profile-container'>
      <Toaster position='top-center' />
      <div className='profile-flex-center'>
        <div className='profile-user'>
          <div className='profile-user-img-container'>
            {user?.image?.thumbnail && <img className='profile-user-img' src={user?.image?.thumbnail} alt='' />}
          </div>
          <div className='profile-user-name'>
            <h2>Welcome, {user?.firstName}</h2>
            <h4>{user?.email}</h4>
          </div>
        </div>
        <div className='profile-user-edit-container'>
          <p className='profile-user-edit' onClick={handleEditProfile}>Edit your profile</p>
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
              <div className='profile-edit-cancel-div'>
                <button className='profile-steelblue' onClick={() => setShowEditProfile(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div className='profile-orders'>
          <p className='profile-orders-history' onClick={handleOrderHistory}>
            Order history {userOrders.length === 0 && '(no orders yet)'}
          </p>
          
          {renderOrders && 
            <div>
              {userOrders.map((item) => {
              return (
                <div key={item._id}>
                  <p className='profile-order-p'>
                    <span>{item.date}</span>, <span>Total Price: {item.totalPrice} €</span>
                  </p>
                  {deleteOrder === item._id ? (
                    <div>
                      <div>
                        <p>Do you really want to delete this order?</p>
                      </div>
                      <div className='delete-order-btns'>
                        <button className='delete-order-yes' onClick={() => handleDeleteOrder(item._id)}>
                          Yes
                        </button>
                        <button className='profile-steelblue' onClick={() => setDeleteOrder('')}>No</button>
                      </div>
                    </div>
                  ) : (
                    <div className='profile-order-delete-div'>
                      <button className='profile-steelblue' onClick={() => {setDeleteOrder(item._id); setUpdateItem(''); setDeleteItem(''); setBookToReview(null); setReviewBtn(null)}}>
                        Delete Order
                      </button>
                    </div>
                  )}
                  {item.books.map((book) => {
                    return (
                      <div className='order-item' key={book._id}>
                        <div className='item-img-title-author'>
                          <img
                            className='profile-order-cursor'
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
                          <div>
                            <p
                              className='profile-order-cursor'
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
                          </div>
                        </div>
                        <div className='profile-order-updates'>
                          <div className='profile-review-form-container'>
                            {reviewBtn === book._id ? 
                            <div className='profile-review-form-div'>
                              {bookToReview?._id === book._id && (
                                <ReviewForm
                                  book={book}
                                  setBookToReview={setBookToReview}
                                  setReviewsChange={setReviewsChange}
                                  userReviews={userReviews}
                                />
                              )}
                            </div>
                            :
                            <button
                              className='profile-steelblue'
                              onClick={() =>
                                {setBookToReview(book);
                                setUpdateItem('');
                                setDeleteItem('');
                                setReviewBtn(book._id)
                                setDeleteOrder('');}
                              }
                            >
                              {userReviews.find((rev) => rev.book === book._id)
                                ? 'Edit your review'
                                : 'Write a review'}
                            </button>
                            }
                          </div>
                          <div className='profile-qty-container'>
                            {updateItem === book._id ? (
                              <div className='profile-qty-div'>
                                <form
                                  className='profile-update-qty-form'
                                  onSubmit={(e) =>
                                    handleUpdateQty(e, item._id, book._id)
                                  }
                                >
                                  <select className='profile-select' name='qty' id='qty'>
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
                                  <button className='continue-button' type='submit'>Send</button>
                                </form>
                                <div className='profile-qty-cancel-div'>
                                  <button className='profile-steelblue' onClick={() => setUpdateItem('')}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <button className='profile-steelblue' onClick={() => {setUpdateItem(book._id); setBookToReview(null); setDeleteItem(''); setReviewBtn(null); setDeleteOrder('')}}>
                                  Update Qty
                                </button>
                              </div>
                            )}
                          </div>
                          <div>
                            {deleteItem === book._id ? (
                              <div className='profile-delete-item-border'>
                                <div className='profile-delete-item-really'>
                                  <p>
                                    Do you really want to delete this item from your
                                    order?
                                  </p>
                                </div>
                                <div className='profile-delete-item-btns'>
                                  <button
                                    className='delete-order-yes'
                                    onClick={() =>
                                      handleDeleteItem(book._id, item._id)
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button className='profile-steelblue' onClick={() => setDeleteItem('')}>
                                    No
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <button className='profile-steelblue' onClick={() => {setDeleteItem(book._id); setBookToReview(null); setUpdateItem(''); setReviewBtn(null); setDeleteOrder('')}}>
                                  Delete Item
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                      </div>
                    );
                  })}
                </div>
              );
            })}
              <div className='profile-orders-close'>
                <button className='profile-steelblue' onClick={() => setRenderOrders(false)}>Close</button>
              </div>
            </div>
            }
        </div>
        <div className='profile-admin'>
          {user?.role === 'admin' && (
            <>
              <div className='profile-upload-book'>
                <p className='profile-upload-book-p' onClick={handleBookForm}>Upload a book</p>
                {showBookForm && (
                  <form className='upload-book-form' onSubmit={uploadBook}>
                    <fieldset className='upload-book-fieldset'>
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
                      <Upload />
                      <div className='upload-book-cancel-div'>
                        <button className='upload-book-cancel-p profile-steelblue' onClick={() => setShowBookForm(false)}>Cancel</button>
                      </div>
                    </fieldset>
                  </form>
                )}
              </div>
              <div className='profile-admin-edit-book'>
                <p className='profile-admin-edit-book-p'>
                  <NavLink
                    to='/books/selection'
                    onClick={hideUpdateDeleteBookForms}
                  >
                    Edit book information
                  </NavLink>
                </p>
              </div>
              <div className='profile-admin-delete-book'>
                <p className='profile-admin-delete-book-p'>
                  <NavLink
                    to='/books/selection'
                    onClick={hideUpdateDeleteBookForms}
                  >
                    Remove a book from assortment
                  </NavLink>
                </p>
              </div>
            </>
          )}
        </div>
        <div className='profile-delete-account'>
          {really ? (
            <div>
              <div className='delete-account-really-div'>
                <p>Do you really want to delete your account?</p>
              </div>
              <div className='delete-account-btns'>
                <button className='delete-account-yes' onClick={handleDelete}>Yes</button>
                <button className='profile-steelblue' onClick={() => setReally(false)}>No</button>
              </div>
            </div>
          ) : (
            <p className='profile-delete-account-p' onClick={showDeleteOption}>DELETE YOUR ACCOUNT</p>
          )}
        </div>
      </div>
    </div>
  );
}
