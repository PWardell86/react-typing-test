import './TypingTestPage.css';
import MainSection from './MainSection';
import Navbar from '../common/Navbar';
import UserStats from './UserStats';

function TypingTestPage({ user, showUpdates }) {
  return (
    <div>
      <div id="game-section">
        <Navbar user={user} active="home" />
        <MainSection />
      </div>
      {user &&
        <div>
          <div className="section-sep" />
          <UserStats />
        </div>
      }
    </div>
  );
}

export default TypingTestPage;