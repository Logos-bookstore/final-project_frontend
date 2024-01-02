import './App.css';
import { useContext } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Books from './pages/Books';
import Genre from './pages/Genre';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <>
      <main key="main">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/books" element={<Books/>}>
            <Route path=":genre" element={<Genre/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
