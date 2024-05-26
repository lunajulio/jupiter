import { Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
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
                <Menu.Item key="home" icon={<ReadOutlined />}>
                    OOPs
                </Menu.Item>
                <Menu.Item key="class" icon={<ReadOutlined />}>
                    Class
                </Menu.Item>
                <Menu.Item key="object" icon={<ReadOutlined />}>
                    Object
                </Menu.Item>
                <Menu.Item key="methods" icon={<ReadOutlined />}>
                    Methods
                </Menu.Item>

                <Menu.SubMenu key="sub1" icon={<ReadOutlined />} title="Pillars of OOPs">
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
