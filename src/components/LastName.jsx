export default function FirstName() {
  return (
    <>
      <div className="lastName-container">
        <label className="lastName-label" htmlFor="lastName">Last Name</label>
        <input className="lastName-input" type="text" name="lastName" id="lastName" />
      </div>
    </>
  );
}
