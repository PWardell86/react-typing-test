import { logout } from "../ServerAPI";
import './UserDropdown.css';

function UserDropdown() {
  return (
    <div className="btn-group">
      <button type="button" className="btn-dropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul className="dropdown-menu dropdown-menu-end" data-bs-theme="dark">
        <li>
          <div className="dropdown-item">
            Light Theme 
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="dark-theme-check" />
            </div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" type="button" onClick={logout}> Logout</button ></li>
      </ul>
    </div>
  );
}
export default UserDropdown;

