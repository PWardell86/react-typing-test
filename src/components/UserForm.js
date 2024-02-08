import './UserForm.css';

function UserForm({ submitAction, title, switchButton }) {
  return (
    <div>
      <a className="back-btn" href="/">← Back</a>
      <div className="container">
        <form className="Auth-form" onSubmit={submitAction}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">{title}</h3>
            <div id="form-group" className="form-group mt-3">
              <label>Username</label>
              <input
                id="username"
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {switchButton}
          </div>
        </form>
      </div>
    </div>
  );
}


export default UserForm;