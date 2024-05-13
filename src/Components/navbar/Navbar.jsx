import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className="navbar">
        <div className="navbar__logo">
          JUPITER
        </div>
        <ul className="navbar__menu">
          <li className="navbar__menu-item">CONCEPTS</li>
          <li className="navbar__menu-item">SUPERVIVENCIA</li>
          <li className="navbar__menu-item"><Link to="/create">CREATIVO</Link></li>
        </ul>
      </div>
  );
};

export default Navbar;
