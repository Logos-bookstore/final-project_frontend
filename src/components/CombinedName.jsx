export default function CombinedName() {
  return (
    <>
      <div className='combinedName-container'>
        <label className='combinedName-label' htmlFor='combinedName'>
          Author
        </label>
        <input
          className='combinedName-input'
          type='text'
          name='combinedName'
          id='combinedName'
        />
      </div>
    </>
  );
}
