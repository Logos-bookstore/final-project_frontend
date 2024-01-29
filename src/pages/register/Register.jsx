import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Continue from '../../components/Continue';
import Email from '../../components/Email';
import FirstName from '../../components/FirstName';
import LastName from '../../components/LastName';
import Password from '../../components/Password';
import ReEnter from '../../components/ReEnter';
import toast, { Toaster } from 'react-hot-toast';
import { Context } from '../../context/Context';
import './register.css'

export default function Register() {
  const { setUser } = useContext(Context);
  const [errorMSGs, setErrorMSGs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorReEnterPW, setErrorReEnterPW] = useState('');
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.reEnter.value) {
      setErrorReEnterPW(
        'Please make sure to enter the same password as above.'
      );
    }

    if (e.target.password.value === e.target.reEnter.value) {
      const user = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      fetch(`${import.meta.env.VITE_REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((res) => {
          const token = res?.headers.get('token');
          if (token) sessionStorage.setItem('token', token);
          return res.json();
        })
        .then((res) => {
          if (res.success) {
            toast.success('Registration successful!');
            setUser(res.data);
            setTimeout(() => navigate('/profile'), 1500);
          } else {
            setErrorMSGs(
              res.message.errors.reduce((acc, item) => {
                acc[item.path] = item.msg;
                return acc;
              }, {})
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      <h2 className='create-an-account'>Create an Account</h2>
      <form className='register-form' onSubmit={register}>
        {errorMSGs.firstName !== '' && <p>{errorMSGs.firstName}</p>}
        <FirstName errorMSGs={errorMSGs} setErrorMSGs={setErrorMSGs} />
        {errorMSGs.lastName && <p>{errorMSGs.lastName}</p>}
        <LastName errorMSGs={errorMSGs} setErrorMSGs={setErrorMSGs} />
        {errorMSGs.email && <p>{errorMSGs.email}</p>}
        <Email errorMSGs={errorMSGs} setErrorMSGs={setErrorMSGs} />
        {errorMSGs.password && <p>{errorMSGs.password}</p>}
        <Password errorMSGs={errorMSGs} setErrorMSGs={setErrorMSGs} />
        {errorReEnterPW && <p>{errorReEnterPW}</p>}
        <ReEnter
          errorReEnterPW={errorReEnterPW}
          setErrorReEnterPW={setErrorReEnterPW}
        />
        <Continue />
      </form>
    </>
  );
}

/* async function register(e) {
    e.preventDefault();
    if(e.target.password.value === e.target.reEnter.value) {
        const user = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_REGISTER}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)});
            if(response.ok) {
                const token = response.headers.get("token");
                if(token) {
                    sessionStorage.setItem("token", token);
                    const data = await response.json();
                    if(data.success) {
                        setUser(data.data);
                        navigate("/profile");
                    };
                };
            };
        } catch (error) {
            //
        };
    } else {
        //
    };
}; */
