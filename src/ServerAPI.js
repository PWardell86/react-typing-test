import axios from 'axios';

const ADDRESS = '3.12.136.62';
const BACKEND = `http://${ADDRESS}:5000/api`;

function signUp(username, password) {
  return axios.post(BACKEND + '/createuser', {
    username: username,
    password: password
  }).then((response) => {
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
    maxRows: maxRows
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

export { signUp, login, getUser, getScores, addScore, saveFeedback, logout};