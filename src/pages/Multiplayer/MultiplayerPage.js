import { useContext, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { joinQueue, getMatch } from "./ServerAPI";
import UserContext from "../../UserContext";

const MSG_NOT_IN_QUEUE = "Not in queue";
const MSG_WAIT_FOR_MATCH = "Waiting for match";

function MultiplayerPage() {
  const [isQueued, setIsQueued] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [getMatchInterval, setGetMatchInterval] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const queueSection = document.getElementById("queue-section");
    const gameSection = document.getElementById("game-section");
    const queueBtn = document.getElementById("queue-button");
    queueBtn.innerText = isQueued ? "Leave Queue" : "Join Queue";

    if (isMatched) {
      queueSection.hidden = true;
      gameSection.hidden = false;
    } else {
      queueSection.hidden = false;
      gameSection.hidden = true;
    }
  }, [isQueued, isMatched]);

  if (!user) {
    return (
      <div>
        <Navbar active="multiplayer" />
        <p>You are not logged in, fool!</p>
      </div>
    );
  }

  const getMatchHelper = () => {
    getMatch().then((match) => {
      if (match) {
        window.clearInterval(getMatchInterval);
        setIsMatched(true);
      }
    });
  };
  
  const toggleQueued = () => {
    const queueStatus = document.getElementById("queue-status");
    if (!isQueued) {
      joinQueue().then(() => {
        setGetMatchInterval(window.setInterval(getMatchHelper, 200));
        queueStatus.innerText = MSG_WAIT_FOR_MATCH;
      });
    } else {
      window.clearInterval(getMatchInterval);
      queueStatus.innerText = MSG_NOT_IN_QUEUE;
    }
    setIsQueued(!isQueued);
  };

  return (
    <div>
      <Navbar active="multiplayer" />
      <div id="queue-section">
        <h1>Multiplayer</h1>
        <p>Play against other people in real time!</p>
        <button
          id="queue-button"
          className="btn btn-primary"
          onClick={toggleQueued}
        >
          Join Queue
        </button>
        <p id="queue-status">Not in queue</p>
      </div>
      <div id="game-section" hidden></div>
    </div>
  );
}

export default MultiplayerPage;
