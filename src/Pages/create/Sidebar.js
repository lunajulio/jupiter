//import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='toolbar'>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode umlNode" onDragStart={(event) => onDragStart(event, 'umlNode')} draggable>
        Class Node
      </div>
    </aside>
  );
};

export default Sidebar;
