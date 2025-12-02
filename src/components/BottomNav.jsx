import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link 
        to="/" 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <span className="nav-icon">🛒</span>
        <span className="nav-label">Shopping</span>
      </Link>
      <Link 
        to="/menu" 
        className={`nav-item ${location.pathname === '/menu' ? 'active' : ''}`}
      >
        <span className="nav-icon">🍽️</span>
        <span className="nav-label">Menu</span>
      </Link>
    </nav>
  );
};

export default BottomNav;

