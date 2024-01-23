export default function Image() {
  return (
    <>
      <div className="image-container">
        <label className="image-label" htmlFor="image">Image</label>
        <input className="image-input" type="file" name="image" id="image" />
      </div>
    </>
  );
}
