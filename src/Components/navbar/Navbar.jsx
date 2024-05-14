import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className="navbar">
        <div className="navbar__logo">
          JUPITER
        </div>
        <ul className="navbar__menu">
          <li className="navbar__menu-item"><Link to="/concept">CONCEPTS</Link></li>
          <li className="navbar__menu-item"><Link to="/challengue">SURVIVE</Link></li>
          <li className="navbar__menu-item"><Link to="/create">CREATIVE</Link></li>
        </ul>
      </div>
  );
};

export default Navbar;
