import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Menulist from '../../Components/menulist/Menulist';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import './concept.css';
import CustomHeader from '../../Components/header/Header';

const { Sider, Content } = Layout;

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
            case 'abstraction':
                markdownFile = require('../../content/abstract.md');
                break;
            case 'encapsulation':
                markdownFile = require('../../content/encapsulation.md');
                break;
            case 'inheritance':
                markdownFile = require('../../content/inheritance.md');
                break;
            case 'polymorphism':
                markdownFile = require('../../content/polymorphism.md');
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
        <Layout className="min-h-screen layout-container">
            <CustomHeader />
            <Layout className="row">
                <Sider className="menu-container">
                    <Menulist setContent={fetchMarkdown} />
                </Sider>
                <Content className="content-container">
                    <div className="content-inner">
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
