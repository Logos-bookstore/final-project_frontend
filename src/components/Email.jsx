export default function Email() {
  return (
    <>
      <div className="email-container">
        <label className="email-label" htmlFor="email">Email</label>
        <input className="email-input" type="email" name="email" id="email" />
      </div>
    </>
  );
}
