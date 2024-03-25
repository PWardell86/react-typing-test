import { Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { setUserOptions } from '../ServerAPI';
import { useState } from 'react';
import './UserOptionsPage.css';
import { DARK_THEME, LIGHT_THEME } from '../themes';

function UserOptionsPage({ user }) {
  const [isLightTheme, setIsLightTheme] = useState(user && user.default_theme === 'light');
  const navigate = useNavigate();

  if (!user) {
    return <h1>Forbidden</h1>;
  }

  const setDarkTheme = () => {
    const body = document.body;
    body.classList.add(DARK_THEME);
    body.classList.remove(LIGHT_THEME);
  }

  const setLightTheme = () => {
    const body = document.body;
    body.classList.add(LIGHT_THEME);
    body.classList.remove(DARK_THEME);
  }

  const handleSwitch = () => {
    if (!isLightTheme) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
    setIsLightTheme(!isLightTheme);
  }

  const getOrDefault = (form, index, defaultValue) => {
    return form[index].value ? form[index].value : defaultValue;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const token = localStorage.getItem('token');
    const display_name = getOrDefault(form, 0, user.display_name);
    const token_duration = getOrDefault(form, 1, user.token_duration);
    const default_theme = form[2].checked ? 'light' : 'dark';

    setUserOptions(token,
      {
        display_name: display_name,
        token_duration: token_duration,
        default_theme: default_theme
      }).then(() => {
        navigate('/');
      }).catch((error) => {
        console.log(error);
      });
  }
  // isLightTheme = !!user && user.default_theme === 'light';
  return (
    <div id="user-options-container">
      <Form id="user-options-form" onSubmit={handleSubmit}>
        <h1> Hello, {user.display_name}</h1>
        <p className="form-tip">
          Here you can modify some options associated with your account.
          The existing value is shown the input box in gray
        </p>
        <Form.Group className="mb-3" >
          <Form.Label>Change display name</Form.Label>
          <p className="input-tip">The name that shows up when you are addressed.</p>
          <Form.Control type="" placeholder={user.display_name} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Token Timeout</Form.Label>
          <p className="input-tip">Specify how many seconds you want your sessions to last before needing to login again.</p>
          <Form.Control placeholder={user.token_duration} />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Light Theme</Form.Label>
          <div className="form-check form-switch">
            <Form.Control className="form-check-input" type="checkbox" role="switch" defaultChecked={isLightTheme} onChange={handleSwitch} />
          </div>
        </Form.Group>
        <button type="submit" className="btn btn-primary">Apply</button>
        <Link className="btn btn-text" to="../">Go Back</Link>
      </Form>
    </div>
  );
}

export default UserOptionsPage;