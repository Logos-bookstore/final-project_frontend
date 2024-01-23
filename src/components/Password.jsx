export default function Password() {
  return (
    <>
      <div className="password-container">
        <label className="password-label" htmlFor="password">Password</label>
        <input className="password-input" type="password" name="password" id="password" />
      </div>
    </>
  );
}
