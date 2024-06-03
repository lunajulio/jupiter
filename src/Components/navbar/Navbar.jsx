import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate en lugar de useHistory
import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Navbar = () => {
  const username = localStorage.getItem('username');
  const points = localStorage.getItem('points');
  const navigate = useNavigate();  // useNavigate en lugar de useHistory

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('points');
    navigate('/#'); // Redirige al usuario a la página de login
  };

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

      <div className="navbar__user">
        <UserOutlined />
        <span>{username}</span>
        <div className="navbar__points">
          <StarOutlined />
          <span>{points}</span>
        </div>
        <Button type="primary" onClick={handleLogout} className="navbar__logout">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
