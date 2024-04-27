import { getLeaderboard } from '../../ServerAPI';
import { useEffect, useState, useContext } from 'react';
import './LeaderboardPage.css';
import Navbar from '../common/Navbar';
import UserContext from '../../UserContext';

function LeaderboardPage() {
  const [namesAndScores, setNamesAndScores] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    getLeaderboard('wpm', 10)
      .then((response) => {
        response.data.forEach((element) => {
          setNamesAndScores((prev) => [...prev, element]);
        });
      });
  }, []);

  return (
    <>
      <Navbar user={user} active="leaderboards"/>
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