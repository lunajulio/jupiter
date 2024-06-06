import { memo, useEffect } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import PropTypes from 'prop-types';

import './create.css';

const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    minHeight: '220px',
    minWidth: '200px',
    border: '1px solid black',
};

const dragHandleStyle = {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'grab',
};

const handleInvisibleStyle = {
    opacity: 0,
    pointerEvents: 'none',
};

const CustomNode = ({ selected, data, id }) => {
    useEffect(() => {
        console.log("ID: ", id);
        const textLabel = document.querySelector(`textarea[id="uml-textarea-clase-${id}"]`);
        console.log("TextLabel: ", textLabel, );

        const handleTextareaClickL = () => {
            const newValue = prompt('Ingrese el nuevo valor:', textLabel.value);
            if (newValue !== null) {
                data.label = newValue;
            }
        };

        if (textLabel) {
            textLabel.addEventListener('click', handleTextareaClickL);

            // Cleanup the event listener on component unmount
            return () => {
                textLabel.removeEventListener('click', handleTextareaClickL);
            };
        }
    }, []);

    useEffect(() => {
        const textAttributes = document.querySelector(`textarea[id="uml-textarea-atributos-${id}"]`);
        console.log("TextAttr: ", textAttributes);

        const handleTextareaClickA = () => {
            const newValue = prompt('Ingrese el nuevo valor:', textAttributes.value);
            if (newValue !== null) {
                data.attributes = newValue;
            }
        };
        if (textAttributes) {
            textAttributes.addEventListener('click', handleTextareaClickA);

            // Cleanup the event listener on component unmount
            return () => {
                textAttributes.removeEventListener('click', handleTextareaClickA);
            };
        }
    }, []);

    useEffect(() => {
        const textMethods = document.querySelector(`textarea[id="uml-textarea-metodos-${id}"]`);

        const handleTextareaClickM = () => {
            const newValue = prompt('Ingrese el nuevo valor:', textMethods.value);
            if (newValue !== null) {
                data.methods = newValue;
            }
        };

        if (textMethods) {
            textMethods.addEventListener('click', handleTextareaClickM);

            // Cleanup the event listener on component unmount
            return () => {
                textMethods.removeEventListener('click', handleTextareaClickM);
            };
        }
    }, [])

    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={200} minHeight={220} />
            <div style={labelStyle}>
                <div className="custom-drag-handle" style={dragHandleStyle}>
                    <div className="uml-header">
                        <textarea id={`uml-textarea-clase-${id}`} name="clase" className="uml-textarea-clase" autoComplete="off" value={data.label}></textarea>
                    </div>
                    <div className='uml-cuerpo'>
                        <div className="uml-attributes">
                            <textarea id={`uml-textarea-atributos-${id}`} name="atributos" className="uml-textarea" autoComplete="off" value={data.attributes}></textarea>
                        </div>
                        <div className="uml-methods">
                            <textarea id={`uml-textarea-metodos-${id}`}name="metodos" className="uml-textarea" autoComplete="off" value={data.methods}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Right} id="b" style={handleInvisibleStyle} />
            <Handle type="source" position={Position.Bottom} id="c" style={handleInvisibleStyle} />
            <Handle type="source" position={Position.Left} id="d" style={handleInvisibleStyle} />
        </>
    );
};

CustomNode.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
        methods: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    selected: PropTypes.bool.isRequired,
};

export default memo(CustomNode);