function UserDropdown() {
  return (
    <div className="dropdown">
      <div className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      </div>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
        <button className="dropdown-item" type="button">Logout</button>
        <button className="dropdown-item" type="button">Settings</button>
        <div className="form-check form-switch">
          <label className="form-check-label" for="flexSwitchCheckDefault">Dark Theme</label>
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

        </div>
      </div>
    </div>
  );
}
export default UserDropdown;