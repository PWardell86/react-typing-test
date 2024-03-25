import { logout } from "../ServerAPI";
import { Link } from 'react-router-dom';
import './UserDropdown.css';

function UserDropdown() {
  return (
    <div className="btn-group">
      <button type="button" className="btn-dropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/options"> User Options </Link ></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" type="button" onClick={logout}> Logout </button ></li>
      </ul>
    </div>
  );
}
export default UserDropdown;

