export default function Password({
  loginError,
  setLoginError,
  errorMSGs,
  setErrorMSGs,
}) {
  const handleErrorOnFocus = () => {
    if (loginError === 'Please make sure your password is correct.')
      setLoginError('');
    // register error:
    setErrorMSGs({ ...errorMSGs, password: '' });
  };

  return (
    <>
      <div className='password-container'>
        <label className='password-label' htmlFor='password'>
          Password
        </label>
        <input
          onFocus={handleErrorOnFocus}
          className='password-input'
          type='password'
          name='password'
          id='password'
        />
      </div>
    </>
  );
}
