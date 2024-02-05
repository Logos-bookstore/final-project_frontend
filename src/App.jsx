import { useContext } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Context } from './context/Context';
import Books from './pages/books/Books';
import Genre from './pages/genre/Genre';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import NotFound from './pages/notFound/NotFound';
import SearchResult from './pages/searchResult/SearchResult';
import SingleBook from './pages/singleBook/SingleBook';
import Selection from './pages/selection/Selection';
import Cart from './pages/cart/Cart';
import DeletedAccount from './pages/deletedAccount/DeletedAccount';
import Checkout from './pages/checkout/Checkout';
import Thankyou from './pages/thankyou/Thankyou';
import About from './pages/about/About';
import { FaBars, FaGithub, FaSearch, FaShoppingCart } from 'react-icons/fa';

function App() {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    setCurrentPage,
    setShoppingCart,
    hideUpdateDeleteBookForms,
    menuIcon,
    setMenuIcon,
  } = useContext(Context);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    setShoppingCart([]);
    localStorage.removeItem('cart');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const plused = e.target.search.value.split(' ').join('+');
    e.target.reset();
    navigate(`/books/request/search?q=${plused}`);
  };

  // (when Books-link clicked) - display all books again / go back to page 1 / hide update/delete book components
  const handleBooksDisplay = () => {
    setCurrentPage(1);
    hideUpdateDeleteBookForms();
    navigate('/books/selection');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header key='header'>
        <nav className='header-navbar'>
          <ul className='logo-ul'>
            <li onClick={hideUpdateDeleteBookForms}>
              <NavLink
                onClick={() => setMenuIcon(false)}
                className='logos shop-logo'
                to='/'
              >
                Logos
              </NavLink>
            </li>
          </ul>
          <ul className='search-ul'>
            <li>
              <form onSubmit={handleSearch}>
                <input
                  className='search-input'
                  type='text'
                  name='search'
                  id='search'
                />
                <button
                  className='search-btn'
                  type='submit'
                  onClick={hideUpdateDeleteBookForms}
                >
                  <FaSearch className='icon' />
                </button>
              </form>
            </li>
          </ul>
          <FaBars
            className='icon menu'
            onClick={() => setMenuIcon((prev) => !prev)}
          />
          {menuIcon && (
            <ul className='links-ul' onClick={() => setMenuIcon(false)}>
              <li onClick={hideUpdateDeleteBookForms}>
                <NavLink
                  onClick={() => setMenuIcon(false)}
                  className='navlink'
                  to='/'
                >
                  Home
                </NavLink>
              </li>
              <li onClick={handleBooksDisplay}>
                <NavLink
                  onClick={() => setMenuIcon(false)}
                  className='navlink'
                  to='/books'
                >
                  Books
                </NavLink>
              </li>
              {!user ? (
                <>
                  <li>
                    <NavLink
                      onClick={() => {
                        setMenuIcon(false);
                      }}
                      className='navlink'
                      to='/register'
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setMenuIcon(false)}
                      className='navlink'
                      to='/login'
                    >
                      Login
                    </NavLink>
                  </li>
                  <li onClick={hideUpdateDeleteBookForms}>
                    <NavLink
                      onClick={() => setMenuIcon(false)}
                      className='navlink'
                      to='/cart'
                    >
                      <FaShoppingCart className='icon' />
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={hideUpdateDeleteBookForms}>
                    <NavLink
                      onClick={() => setMenuIcon(false)}
                      className='navlink'
                      to='/profile'
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li onClick={hideUpdateDeleteBookForms}>
                    <NavLink
                      onClick={() => setMenuIcon(false)}
                      className='navlink'
                      to='/cart'
                    >
                      <FaShoppingCart className='icon' />
                    </NavLink>
                  </li>
                  <li onClick={logout}>
                    <NavLink
                      onClick={() => setMenuIcon(false)}
                      className='navlink logos'
                      to='/'
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
          <ul className='desktop-links'>
            <li onClick={hideUpdateDeleteBookForms}>
              <NavLink
                onClick={() => setMenuIcon(false)}
                className='navlink'
                to='/'
              >
                Home
              </NavLink>
            </li>
            <li onClick={handleBooksDisplay}>
              <NavLink
                onClick={() => setMenuIcon(false)}
                className='navlink'
                to='/books'
              >
                Books
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink'
                    to='/register'
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink'
                    to='/login'
                  >
                    Login
                  </NavLink>
                </li>
                <li onClick={hideUpdateDeleteBookForms}>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink'
                    to='/cart'
                  >
                    <FaShoppingCart className='icon' />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li onClick={hideUpdateDeleteBookForms}>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink'
                    to='/profile'
                  >
                    Profile
                  </NavLink>
                </li>
                <li onClick={hideUpdateDeleteBookForms}>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink'
                    to='/cart'
                  >
                    <FaShoppingCart className='icon' />
                  </NavLink>
                </li>
                <li onClick={logout}>
                  <NavLink
                    onClick={() => setMenuIcon(false)}
                    className='navlink logos'
                    to='/'
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main key='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />}>
            <Route path='/books/genre/:genre' element={<Genre />} />
            <Route path='/books/selection' element={<Selection />} />
            <Route path='/books/:title/:id' element={<SingleBook />} />
            <Route path='/books/request/:search' element={<SearchResult />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankyou' element={<Thankyou />} />
          <Route path='/deletedAccount' element={<DeletedAccount />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <div className='footer-content'>
          <div className='footer-about-github'>
            <div className='footer-item' onClick={hideUpdateDeleteBookForms}>
              <NavLink className='navlink' to='/about'>
                About
              </NavLink>
            </div>
            <div className='footer-item' onClick={hideUpdateDeleteBookForms}>
              <a
                href='https://github.com/pozniej-znajde-wolne-haslo/final-project_backend'
                target='_blank'
                className='footer-link'
              >
                <FaGithub className='icon' />
              </a>
            </div>
          </div>
          <div className='footer-book-store'>
            &copy; {currentYear}
            <span className='footer-text'>Logos</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
