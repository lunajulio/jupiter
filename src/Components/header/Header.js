import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate en lugar de useHistory
import './header.css'; // Si tienes estilos específicos para el header
import { UserOutlined, StarOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader = () => {
    const username = localStorage.getItem('username');
    const points = localStorage.getItem('points');
    const navigate = useNavigate(); // useNavigate en lugar de useHistory

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('points');
        navigate('/#'); // Redirige al usuario a la página de login
    };

    return (
        <Header className="bg-dark text-white flex justify-between items-center p-0 custom-padding">
            <div className="logo p-4">
                <h1 className="logo">JUPITER</h1>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/background">HOME</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/survive">SURVIVE</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/create">CREATIVE</Link>
                </Menu.Item>
            </Menu>

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
        </Header>
    );
};

export default CustomHeader;