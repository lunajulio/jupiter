import { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './menulist.css';
import ReactMarkdown from 'react-markdown';
import exampleMarkdown from '../../assets/markdown1.md'; // Importa el archivo Markdown

const Menulist = () => {
    const [content, setContent] = useState('Home');

    // Define el contenido Markdown para cada opción del menú
    const markdownContents = {
        home: '# Welcome to the Home Page',
        concept1: '# Concept 1 Markdown Content',
        concept2: '# Concept 2 Markdown Content',
        example: exampleMarkdown // Contenido del archivo Markdown importado
    };

    return (
        <div className="row">
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
                    <Menu.Item key="example" icon={<HomeOutlined />}>
                        Example
                    </Menu.Item>
                    {/* Agrega más opciones según sea necesario */}
                </Menu>
            </div>

            {/* Contenido */}
            <div className="content-container">
                {/* Renderiza el contenido Markdown basado en la opción seleccionada */}
                <div className="content">
                    <ReactMarkdown>{markdownContents[content]}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Menulist;
