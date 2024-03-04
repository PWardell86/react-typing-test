import { Table } from 'react-bootstrap';
import './UserStats.css';
import React from 'react';
import { getScores } from '../ServerAPI';

function UserStats({ backend, token }) {
  const MAX_ROWS = 10;
  const [data, setData] = React.useState([]);


  const refresh = () => {
    document.getElementById('refresh-img').classList.add('spin');
    getScores(token, MAX_ROWS)
    .then((response) => {
      setData(response.data.scores);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      document.getElementById('refresh-img').classList.remove('spin');
    });
  }

  React.useEffect(getScores, [backend, token]);

  return (
    <div id="user-stats">
      <div id="stats-header">
        <h1>Stats</h1>
        <img id="refresh-img" className="spinner" src="refresh.svg" alt="" onClick={refresh} />
      </div>
      {data.length === 0 && <p>No data</p>}
      {data.length !== 0 &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Accuracy</th>
              <th>WPM</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </div>
  );
}

export default UserStats;