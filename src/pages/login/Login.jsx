import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Continue from '../../components/Continue';
import Email from '../../components/Email';
import Password from '../../components/Password';
import { Context } from '../../context/Context';
import './login.css'

export default function Login() {
  const { setUser } = useContext(Context);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch(`${import.meta.env.VITE_LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        const token = response.headers.get('token');
        if (token) {
          sessionStorage.setItem('token', token);
        }
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          setUser(response.data);
          navigate('/profile');
        } else {
          setLoginError(response.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-container'>
      <h2 className='sign-in'>Sign In</h2>
      <form className='login-form' onSubmit={login}>
        {loginError === 'Please make sure your email is correct.' && (
          <p>{loginError}</p>
        )}
        <Email loginError={loginError} setLoginError={setLoginError} />
        {loginError === 'Please make sure your password is correct.' && (
          <p>{loginError}</p>
        )}
        <Password loginError={loginError} setLoginError={setLoginError} />
        <Continue />
      </form>
    </div>
  );
}

/* async function login(e) {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const token = response.headers.get('token');
        if (token) {
          sessionStorage.setItem('token', token);
          const data = await response.json();
          if (data.success) {
            setUser(data.data);
            navigate('/profile');
          }
        }
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      //
    }
  } */
