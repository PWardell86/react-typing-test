import { getLeaderboard } from '../ServerAPI';
import { useEffect, useState } from 'react';
import './LeaderboardPage.css';
import MainNavbar from './MainNavbar';

function LeaderboardPage({ user }) {
  const [namesAndScores, setNamesAndScores] = useState([]);

  useEffect(() => {
    getLeaderboard('wpm', 50)
      .then((response) => {
        response.data.forEach((element) => {
          setNamesAndScores((prev) => [...prev, element]);
        });
      });
  }, []);

  return (
    <>
      <MainNavbar user={user} active="leaderboards"/>
      <div id="leaderboard-container">
        <h2>Words Per Minute</h2>
        <ul className="leaderboard">
          {namesAndScores.map(([name, display_name, score], index) => (
            <>
              <li>{index + 1}. ({display_name}) {name} - <b>{score} wpm</b></li>
              <hr></hr>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LeaderboardPage;
