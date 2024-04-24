import './TypingTestPage.css';
import MainSection from './MainSection';
import MainNavbar from './MainNavbar';
import UserStats from './UserStats';

function TypingTestPage({ user, showUpdates }) {
  return (
    <div>
      <div id="game-section">
        <MainNavbar user={user} active="home" />
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