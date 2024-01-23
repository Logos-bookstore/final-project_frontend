export default function FirstName() {
  return (
    <>
      <div className="firstName-container">
        <label className="firstName-label" htmlFor="firstName">First Name</label>
        <input className="firstName-input" type="text" name="firstName" id="firstName" />
      </div>
    </>
  );
}
