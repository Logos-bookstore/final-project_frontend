export default function FirstName({ errorMSGs, setErrorMSGs }) {
  const handleErrorOnFocus = () => {
    setErrorMSGs({ ...errorMSGs, firstName: '' });
  };

  return (
    <>
      <div className='firstName-container'>
        <label className='firstName-label' htmlFor='firstName'>
          First Name
        </label>
        <input
          onFocus={handleErrorOnFocus}
          className='firstName-input'
          type='text'
          name='firstName'
          id='firstName'
        />
      </div>
    </>
  );
}
