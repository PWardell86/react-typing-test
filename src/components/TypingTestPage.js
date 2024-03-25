import './TypingTestPage.css';
import FeedbackModal from './FeedbackModal';
import MainSection from './MainSection';
import MainNavbar from './MainNavbar';
import UserStats from './UserStats';

function TypingTestPage({ user, showUpdates}) {
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
      <footer>
        <FeedbackModal />
        <p className="warning">This is a WIP. Some things are not polished. Scores you save now will probably be lost.</p>
      </footer>
    </div>
  );
}

export default TypingTestPage;