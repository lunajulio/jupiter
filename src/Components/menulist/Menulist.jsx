import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './menulist.css';
import PropTypes from 'prop-types';

const Menulist = ({ setContent }) => {
    return (
        <div className="menu-container">
            <Menu
                theme="dark"
                mode="inline"
                className="menu-bar"
                onClick={({ key }) => {
                    setContent(key);
                }}
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="Concept">
                    <Menu.Item key="concept1">Concept 1</Menu.Item>
                    <Menu.Item key="concept2">Concept 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="example" icon={<HomeOutlined />}>
                    Example
                </Menu.Item>
                {/* Agrega más opciones según sea necesario */}
            </Menu>
        </div>
    );
};

Menulist.propTypes = {
    setContent: PropTypes.func.isRequired,
};


export default Menulist;
