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
import { FaGithub } from 'react-icons/fa';

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const { setCurrentPage } = useContext(Context);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const plused = e.target.search.value.split(' ').join('+');
    e.target.reset();
    navigate(`/books/request/search?q=${plused}`);
  };

  // handler to display all books again (when Books-link clicked)
  const handleBooksDisplay = () => {
    setCurrentPage(1);
    navigate('/books/selection');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header key='header'>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Logo</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <form onSubmit={handleSearch}>
                <input type='text' name='search' id='search' />
                <button type='submit'>Search</button>
              </form>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li onClick={handleBooksDisplay}>
              <NavLink to='/books'>Books</NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to='/register'>Register</NavLink>
                </li>
                <li>
                  <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                  <NavLink to='/cart'>Cart</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/profile'>Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/cart'>Cart</NavLink>
                </li>
                <li onClick={logout}>
                  <NavLink to='/'>Logout</NavLink>
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
          <div className='footer-item'>
            <a
              href='https://github.com/pozniej-znajde-wolne-haslo/final-project_backend'
              target='_blank'
              className='footer-link'
            >
              <FaGithub className='icon' />
            </a>
          </div>
          <div className='footer-item'>
            <NavLink to='/about'>About</NavLink>
          </div>
          <div className='footer-item'>
            <span className='footer-text'>&copy; {currentYear} Book Store</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
