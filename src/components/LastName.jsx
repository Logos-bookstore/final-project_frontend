export default function LastName({ errorMSGs, setErrorMSGs }) {
  const handleErrorOnFocus = () => {
    setErrorMSGs({ ...errorMSGs, lastName: '' });
  };

  return (
    <>
      <div className='lastName-container'>
        <label className='lastName-label' htmlFor='lastName'>
          Last Name
        </label>
        <input
          onFocus={handleErrorOnFocus}
          className='lastName-input'
          type='text'
          name='lastName'
          id='lastName'
        />
      </div>
    </>
  );
}
