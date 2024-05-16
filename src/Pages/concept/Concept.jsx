import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Logo from '../../Components/logo/Logo';
import Menulist from '../../Components/menulist/Menulist';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const { Sider, Content } = Layout;

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
        

        <Layout className="flex flex-row w-full">

            <Sider className="bg-dark">
                <Logo />
                <Menulist setContent={fetchMarkdown} />
            </Sider>

            <Content className="flex-1 p-4 bg-gray-100">
                <div className="p-4 bg-white rounded shadow-sm">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkHtml]}
                    components={{
                        h1: (props) => <h1 className="text-5xl font-bold my-6" {...props} />, // Cambiar el tamaño de la letra y el espacio entre líneas
                        h2: (props) => <h2 className="text-4xl font-semibold my-4" {...props} />, // Cambiar el tamaño de la letra y el espacio entre líneas
                        h3: (props) => <h3 className="text-3xl font-medium my-3" {...props} />, // Cambiar el tamaño de la letra y el espacio entre líneas
                        p: (props) => <p className="text-xl my-2" {...props} />, // Cambiar el tamaño de la letra y el espacio entre párrafos
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
    );
};

export default Concept;
