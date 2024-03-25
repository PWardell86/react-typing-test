import './TypingTestPage.css';
import FeedbackModal from './FeedbackModal';
import MainSection from './MainSection';
import MainNavbar from './MainNavbar';
import UserStats from './UserStats';

function TypingTestPage({ user, showUpdates }) {
  console.log(showUpdates);
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