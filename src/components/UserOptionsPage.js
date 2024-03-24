import { Form } from "react-bootstrap";
import { setUserOptions } from '../ServerAPI';
import React from 'react';
import './UserOptionsPage.css';
import { DARK_THEME, LIGHT_THEME } from '../themes';

class UserOptionsPage extends React.Component {
  isLightTheme = false;

  setDarkTheme = () => {
    const body = document.body;
    body.classList.add(DARK_THEME);
    body.classList.remove(LIGHT_THEME);
  }

  setLightTheme = () => {
    const body = document.body;
    body.classList.add(LIGHT_THEME);
    body.classList.remove(DARK_THEME);
  }

  handleSwitch = () => {
    if (!this.isLightTheme) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
    this.isLightTheme = !this.isLightTheme;
  }

  getOrDefault = (form, index, defaultValue) => {
    return form[index].value ? form[index].value : defaultValue;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const token = localStorage.getItem('token');
    const display_name = this.getOrDefault(form, 0, this.props.user.display_name);
    const token_duration = this.getOrDefault(form, 1, this.props.user.token_duration);
    const default_theme = form[2].checked ? 'light' : 'dark';
    setUserOptions(token, { display_name: display_name, token_duration: token_duration, default_theme: default_theme })
      .then(() => {
        window.location = '/';
      })
      .catch(() => {
        alert("There was a problem updating your settings. Please try again later.");
      });
  }
  render = () => {
    const user = this.props.user;
    if (!user) {
      return <h1>Not logged in</h1>;
    }
    this.isLightTheme = !!user && user.default_theme === 'light';
    return (
      <div id="user-options-container">
        <Form id="user-options-form" onSubmit={this.handleSubmit}>
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
              <Form.Control className="form-check-input" type="checkbox" role="switch" defaultChecked={this.isLightTheme} onChange={this.handleSwitch} />
            </div>
          </Form.Group>
          <button type="submit" className="btn btn-primary">Apply</button>
          <a className="btn btn-text" href="../">Go Back</a>
        </Form>
      </div>
    );
  }

}

export default UserOptionsPage;