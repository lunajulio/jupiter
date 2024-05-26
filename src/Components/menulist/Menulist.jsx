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
                    OOPs
                </Menu.Item>
                <Menu.Item key="class" icon={<HomeOutlined />}>
                    Class
                </Menu.Item>
                <Menu.Item key="object" icon={<HomeOutlined />}>
                    Object
                </Menu.Item>
                <Menu.Item key="methods" icon={<HomeOutlined />}>
                    Methods
                </Menu.Item>

                <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="Pillars of OOPs">
                    <Menu.Item key="abstraction">Abstraction</Menu.Item>
                    <Menu.Item key="encapsulation">Encapsulation</Menu.Item>
                    <Menu.Item key="inheritance">Inheritance</Menu.Item>
                    <Menu.Item key="polymorphism">Polymorphism</Menu.Item>
                </Menu.SubMenu>
                {/* Agrega más opciones según sea necesario */}
            </Menu>
        </div>
    );
};

Menulist.propTypes = {
    setContent: PropTypes.func.isRequired,
};


export default Menulist;
