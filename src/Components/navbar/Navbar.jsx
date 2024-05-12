// Navbar.jsx
import './navbar.css';
import jupiter from '../../assets/jupiter.png'; // Ruta a tu imagen de icono

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={jupiter} alt="Logo Icon" className="navbar__logo-icon" />
        JUPITER
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu-item">APRENDER</li>
        <li className="navbar__menu-item">JUGAR</li>
        <li className="navbar__menu-item">CREAR</li>
      </ul>
    </div>
  );
};

export default Navbar;
