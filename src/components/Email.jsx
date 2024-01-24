export default function Email({ loginError, setLoginError }) {
  const handleErrorOnFocus = () => {
    if (loginError === 'Please make sure your email is correct.')
      setLoginError('');
  };

  return (
    <>
      <div className='email-container'>
        <label className='email-label' htmlFor='email'>
          Email
        </label>
        <input
          onFocus={handleErrorOnFocus}
          className='email-input'
          type='email'
          name='email'
          id='email'
        />
      </div>
    </>
  );
}
