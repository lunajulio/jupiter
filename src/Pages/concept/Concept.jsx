import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import Menulist from '../../Components/menulist/Menulist';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { Link } from 'react-router-dom';
import './concept.css';


const { Sider, Content, Header } = Layout;

const Concept = () => {
    const [content, setContent] = useState('');

    const fetchMarkdown = (key) => {
        let markdownFile;
        switch (key) {
            case 'home':
                markdownFile = require('../../content/home.md');
                break;
            case 'class':
                markdownFile = require('../../content/class.md');
                break;
            case 'object':
                markdownFile = require('../../content/object.md');
                break;
            case 'methods':
                markdownFile = require('../../content/methods.md');
                break;
            default:
                markdownFile = require('../../content/home.md');
        }

        fetch(markdownFile)
            .then((response) => response.text())
            .then((md) => {
                setContent(md);
            });
    };

    useEffect(() => {
        // Cargar contenido inicial
        fetchMarkdown('home');
    }, []);

    return (
        <Layout className="min-h-screen">
            <Header className="bg-dark text-white flex justify-between items-center p-0">
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
            </Header>
            <Layout className="flex">
                <Sider className="bg-dark">
                    <Menulist setContent={fetchMarkdown} />
                </Sider>
                <Content className="flex-1 p-4 bg-gray-100">
                    <div className="p-4 bg-white rounded shadow-sm">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkHtml]}
                            components={{
                                h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
                                h2: (props) => <h2 className="text-3xl font-semibold my-4" {...props} />,
                                h3: (props) => <h3 className="text-2xl font-medium my-4" {...props} />,
                                h4: (props) => <h4 className="text-xl font-medium my-4" {...props} />,
                                h5: (props) => <h5 className="text-lg font-medium my-4" {...props} />,
                                h6: (props) => <h6 className="text-base font-medium my-4" {...props} />,
                                p: (props) => <p className="text-lg my-4" {...props} />,
                                a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
                                ul: (props) => <ul className="list-disc pl-5 my-4 text-lg" {...props} />,
                                ol: (props) => <ol className="list-decimal pl-5 my-4 text-lg" {...props} />,
                                blockquote: (props) => <blockquote className="border-l-4 pl-4 italic my-4 text-gray-600" {...props} />,
                                code: (props) => <code className="bg-gray-100 p-1 rounded" {...props} />,
                                pre: (props) => <pre className="bg-gray-800 text-white p-4 rounded my-4 overflow-auto" {...props} />,
                                img: (props) => (
                                    <div className="img-container">
                                        <img className="max-w-full h-auto rounded my-4" {...props} />
                                    </div>
                                ),
                                table: (props) => <table className="styled-table" {...props} />,
                                strong: (props) => <strong className="font-semibold" style={{ fontWeight: 600 }} {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Concept;
