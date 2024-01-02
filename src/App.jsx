import './App.css';
import { Context } from './context/Context';

function App() {
  const {user, setUser} = useContext(Context);
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
  };
  return (
    <>
      <header key="header">
        <nav>
          <ul>
            <li><NavLink to="/">Logo</NavLink></li>
          </ul>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
            {
              !user ?
                <>
                  <li><NavLink to="/register">Register</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
                </>
                :
                <>
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li onClick={logout}><NavLink to="/">Logout</NavLink></li>
                </>
            }
          </ul>
        </nav>
      </header>
    </>
  );
}

export default App;
