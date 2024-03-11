import { Table } from 'react-bootstrap';
import React from 'react';
import { getScores } from '../ServerAPI';
import './UserStats.css';

function UserStats() {
  const MAX_ROWS = 10;
  const [data, setData] = React.useState([]);


  const refresh = () => {
    document.getElementById('refresh-icobtn').classList.add('spin');

    getScores(localStorage.getItem('token'), MAX_ROWS)
      .then((response) => {
        setData(response.data.scores);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        document.getElementById('refresh-icobtn').classList.remove('spin');
      });

  }

  React.useEffect(() => { getScores(localStorage.getItem('token'), MAX_ROWS) });

  const refreshButton = (
    <svg id="refresh-icobtn" onClick={refresh} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
    </svg>
  );

  return (
    <div id="user-stats">
      <div id="stats-header">
        <h1>Stats</h1>
        {refreshButton}
      </div>
      {data.length === 0 && <p>No data</p>}
      {data.length !== 0 &&
        <Table striped bordered>
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