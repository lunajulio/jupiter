//import React from 'react';
import PropTypes from 'prop-types';
import { Handle, Position, NodeResizer } from 'reactflow';

const UMLNode = ({ data }) => {
  return (
    <>
    <NodeResizer minWidth={300} minHeight={250} />
    <div className="uml-node">
      <div className="uml-header">{data.label}</div>
      <div className="uml-attributes">
        {data.attributes.map((attr, index) => (
          <div key={index}>{attr}</div>
        ))}
      </div>
      <div className="uml-methods">
        {data.methods.map((method, index) => (
          <div key={index}>{method}</div>
        ))}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
    </>
  );
};

UMLNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
    methods: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default UMLNode;
