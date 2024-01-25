export default function ReEnter({ setErrorReEnterPW }) {
  const handleErrorOnFocus = () => setErrorReEnterPW('');
  return (
    <>
      <div className='reEnter-container'>
        <label className='reEnter-label' htmlFor='re-enter'>
          Re-enter password
        </label>
        <input
          onFocus={handleErrorOnFocus}
          className='reEnter-input'
          type='password'
          name='reEnter'
          id='reEnter'
        />
      </div>
    </>
  );
}
