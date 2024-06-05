import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import PropTypes from 'prop-types';

const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
};

const dragHandleStyle = {
    display: 'inline-block',
    width: 15,
    height: 15,
    backgroundColor: 'teal',
    borderRadius: '10%',
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'grab',
};

const handleInvisibleStyle = {
    opacity: 0,
    pointerEvents: 'none',
  };

const CustomNode = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
            <div style={labelStyle}>{data.label}
                <span className="custom-drag-handle" style={dragHandleStyle} />
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