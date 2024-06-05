import { memo } from 'react';
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
    //borderRadius: '10%',
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'grab',
};

const handleInvisibleStyle = {
    opacity: 0,
    pointerEvents: 'none',
  };

const CustomNode = ({selected}) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={200} minHeight={220} />
            <div style={labelStyle}>
                <div className="custom-drag-handle" style={dragHandleStyle}>
                    <div className="uml-header"><textarea name="clase" className="uml-textarea-clase"
                                autoComplete="off"> Clase </textarea></div>
                    <div className='uml-cuerpo'>
                        <div className="uml-attributes">
                            <textarea name="atributos" className="uml-textarea"
                                autoComplete="off"> Atributos </textarea>
                        </div>
                        <div className="uml-methods">
                            <textarea name="atributos" className="uml-textarea"
                                autoComplete="off"> Métodos </textarea>
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
}

CustomNode.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
    selected: PropTypes.bool.isRequired,
};

export default memo(CustomNode);