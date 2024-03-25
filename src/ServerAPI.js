import axios from 'axios';

const ADDRESS = 'peterwardell.site';
const BACKEND = `https://${ADDRESS}/api`;

function signUp(username, password) {
  return axios.post(BACKEND + '/createuser', {
    username: username,
    password: password
  }).then(() => {
    login(username, password)
  });
}

function login(username, password) {
  return axios.post(BACKEND + '/login', {
    username: username,
    password: password
  }).then((response) => {
    localStorage.setItem('token', response.data.token);
    window.location.reload();
  });
}

function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

function getUser(token) {
  return axios.post(BACKEND + '/getuser', {
    token: token
  });
}

function getScores(token, maxRows) {
  return axios.post(BACKEND + '/getscores', {
    token: token,
    max_rows: maxRows
  });
}

function setUserOptions(token, options) {
  return axios.post(BACKEND + '/setuseroptions', {
    token: token,
    user_options: options
  });
}

function addScore(token, scoreJSON) {
  return axios.post(BACKEND + '/addscore', {
    token: token,
    ...scoreJSON
  });
}

function saveFeedback(feedback) {
  return axios.post(BACKEND + '/savefeedback', {
    feedback: feedback,
  })
}

function getLeaderboard(type, maxRows) {
  return axios.post(BACKEND + '/getleaderboard', {
    type: type,
    max_rows: maxRows
  });
}

function getParagraph() {
  return axios.get(BACKEND + '/getparagraph');
}

export { signUp, login, getUser, getScores, addScore, saveFeedback, logout, setUserOptions, getLeaderboard , getParagraph };