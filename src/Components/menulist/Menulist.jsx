/* eslint-disable react/prop-types */
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './menulist.css';
import { useState } from 'react';

const Menulist = () => {
    const [content, setContent] = useState('Home');

    return (
        <div className="menulist-container">
            {/* Menú */}
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
                    <Menu.Item key="concept" icon={<HomeOutlined />}>
                        Activity
                    </Menu.Item>
                    <Menu.Item key="about" icon={<HomeOutlined />}>
                        About
                    </Menu.Item>
                    <Menu.Item key="contact" icon={<HomeOutlined />}>
                        Contact
                    </Menu.Item>
                </Menu>
            </div>

            {/* Contenido */}
            <div className="content-container">
                <Content content={content} />
            </div>
        </div>
    );
};

const Content = ({ content }) => {
    return <div className="content">{content}</div>;
};

export default Menulist;
