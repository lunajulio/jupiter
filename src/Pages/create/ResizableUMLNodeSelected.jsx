import { memo, useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Handle, Position, NodeResizer, useReactFlow } from 'reactflow';

const ResizableUMLNodeSelected = ({ data, selected }) => {
  const [attributes, setAttributes] = useState(data.attributes.join('\n'));
  const [methods, setMethods] = useState(data.methods.join('\n'));
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(300);

  const attributesRef = useRef(null);
  const methodsRef = useRef(null);
  const containerRef = useRef(null);
  const { fitView } = useReactFlow();

  const handleAttributesChange = (event) => {
    setAttributes(event.target.value);
    adjustHeight(event.target);
  };

  const handleMethodsChange = (event) => {
    setMethods(event.target.value);
    adjustHeight(event.target);
  };

  useLayoutEffect(() => {
    adjustHeight(attributesRef.current);
    adjustHeight(methodsRef.current);
    adjustContainerSize();
  }, []);

  const adjustHeight = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    adjustContainerSize();
  };

  const adjustContainerSize = () => {
    const container = containerRef.current;
    const attributesHeight = attributesRef.current ? attributesRef.current.scrollHeight : 0;
    const methodsHeight = methodsRef.current ? methodsRef.current.scrollHeight : 0;
    const totalHeight = attributesHeight + methodsHeight + 100; // Ajusta el valor según el espacio adicional necesario
    setContainerHeight(totalHeight);
    container.style.height = `${totalHeight}px`;
    fitView();
  };

  const handleResizeStop = (event, direction, ref) => {
    setContainerWidth(ref.offsetWidth);
    setContainerHeight(ref.offsetHeight);
  };

  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={300}
        minHeight={250}
        onResizeStop={handleResizeStop}
      />
      <Handle type="target" position={Position.Top} />
      <div
        className="uml-node"
        ref={containerRef}
        style={{ height: containerHeight, width: containerWidth }}
      >
        <div className="uml-header">{data.label}</div>
        <div className="uml-attributes">
          <textarea
            ref={attributesRef}
            value={attributes}
            onChange={handleAttributesChange}
            className="uml-textarea"
            autoComplete="off"
            style={{ width: '100%' }}
          />
        </div>
        <div className="uml-methods">
          <textarea
            ref={methodsRef}
            value={methods}
            onChange={handleMethodsChange}
            className="uml-textarea"
            autoComplete="off"
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

ResizableUMLNodeSelected.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
    methods: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default memo(ResizableUMLNodeSelected);
