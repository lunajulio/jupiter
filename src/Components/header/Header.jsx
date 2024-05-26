// src/Components/header/Header.jsx
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css'; // Si tienes estilos específicos para el header
import { UserOutlined, StarOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader = () => {
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
            <span>USER</span>
            <div className="navbar__points">
                <StarOutlined />
                <span>100</span>
            </div>
            </div>
        </Header>
    );
};

export default CustomHeader;
