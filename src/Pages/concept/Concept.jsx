import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import Menulist from '../../Components/menulist/Menulist';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { Link } from 'react-router-dom';

const { Sider, Content, Header } = Layout;

const Concept = () => {
    const [content, setContent] = useState('');

    const fetchMarkdown = (key) => {
        let markdownFile;
        switch (key) {
            case 'home':
                markdownFile = require('../../content/home.md');
                break;
            case 'concept1':
                markdownFile = require('../../content/concept1.md');
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
                    <h1 className="text-white text-2xl font-bold">Mi Proyecto</h1>
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
                                h1: (props) => <h1 className="text-2xl font-bold my-2" {...props} />,
                                h2: (props) => <h2 className="text-xl font-semibold my-2" {...props} />,
                                h3: (props) => <h3 className="text-lg font-medium my-2" {...props} />,
                                p: (props) => <p className="text-lg my-2" {...props} />,
                                a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
                                ul: (props) => <ul className="list-disc pl-5 my-2" {...props} />,
                                ol: (props) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                blockquote: (props) => <blockquote className="border-l-4 pl-4 italic my-2" {...props} />,
                                code: (props) => <code className="bg-gray-100 p-1 rounded" {...props} />,
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
