// Navbar.jsx
import './navbar.css';


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
                JUPITER
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu-item">CONCEPTS</li>
        <li className="navbar__menu-item">CHALLENGE</li>
        <li className="navbar__menu-item">CREATE</li>
      </ul>
    </div>
  );
};

export default Navbar;
