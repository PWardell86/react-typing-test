import axios from "axios";

const ADDRESS = 'localhost:5000';
const BACKEND = `http://${ADDRESS}/api`;
const getToken = () => localStorage.getItem("token");

function joinQueue() {
  const token = getToken();
  return axios.post(BACKEND + "/joinqueue", {
    token: token,
  });
}

function leaveQueue() {
  const token = getToken();
  return axios.post(BACKEND + "/leavequeue", {
    token: token,
  });
}

function getMatch() {
  const token = getToken();
  return axios.post(BACKEND + "/getmatch", {
    token: token,
  });
}

function sendMatchData(data) {
  const token = getToken();
  return axios.post(BACKEND + "/sendmatchdata", {
    token: token,
    data: data,
  });
}

function getMatchData() {
  const token = getToken();
  return axios.post(BACKEND + "/getmatchdata", {
    token: token,
  });
}

export { joinQueue, leaveQueue, getMatch, sendMatchData, getMatchData };
