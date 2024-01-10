import { useContext } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Context } from './context/Context';
import Books from './pages/Books';
import Genre from './pages/Genre';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SearchResult from './pages/SearchResult';
import SingleBook from './pages/SingleBook';
import Selection from './pages/Selection';

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
    navigate(`/books/request/search?q=${e.target.search.value}`);
  };

  // handler to display all books again (when Books-link clicked)
  const handleBooksDisplay = () => {
    setCurrentPage(1);
    navigate("/books/selection");
  };

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
                <button type='submit'>search</button>
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
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/profile'>Profile</NavLink>
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
            <Route
              path='/books/genre/:genre'
              element={<Genre />}
            />
            <Route path='/books/selection' element={<Selection/>} />
            <Route path='/books/singlebook/:id' element={<SingleBook />} />
            <Route path='/books/request/:search' element={<SearchResult />}/>
          </Route>
          
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
