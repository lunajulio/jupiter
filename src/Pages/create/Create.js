import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  updateEdge,
  MarkerType,
  ConnectionMode,
  Controls,
  useStoreApi,
  Background,
  BackgroundVariant,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomEdge from './CustomEdgeGer.jsx';
import { initialEdges, initialNodes } from './nodes-and-edges.jsx';
import './create.css';

import CustomNode from './CustomNode.jsx';

const MIN_DISTANCE = 0;

const nodeTypes = {
  newNode: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const getId = (() => {
  let id = 0;
  return () => `dndnode_${id++}`;
})();

const DnDFlow = () => {
  const store = useStoreApi();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const edgeUpdateSuccessful = useRef(true);
  const { setViewport } = useReactFlow();

  const fitViewOptions = { padding: 4 };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom', markerEnd: { type: MarkerType.Arrow }}, eds)),
    []
  );

  const getClosestEdge = useCallback((node) => {
    const { nodeInternals } = store.getState();
    const storeNodes = Array.from(nodeInternals.values());

    const closestNode = storeNodes.reduce(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute.x - node.positionAbsolute.x;
          const dy = n.positionAbsolute.y - node.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      },
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${closestNode.node.id}-${node.id}`
        : `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, [store]);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )

        ) {
          closeEdge.className = 'temp';
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges],
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: 'newNode',
        dragHandle: '.custom-drag-handle',
        position,
        data: {
          label: 'Class',
          attributes: [
            '+ attribute1:type = defaultValue',
            '+ attribute2:type',
            '- attribute3:type',
          ],
          methods: [
            '+ operation1(params):returnType',
            '- operation2(params)',
            '- operation3()',
          ],
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge.id); // Guardar el id del borde seleccionado
  }, []);

  const addArrowToEdge = useCallback(() => {
    if (selectedEdge) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === selectedEdge) {
            console.log("Type: " + edge.markerEnd.type);
            if (edge.markerEnd.type === 'arrow') {
              return { ...edge, markerEnd: { type: '' }, };
            } else {
              return { ...edge, markerEnd: { type: 'arrow' }, };
            }
          }
          return edge;
        }),
      );
    }
  }, [selectedEdge, setEdges]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const downloadJson = (content, fileName) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      downloadJson(flow, 'flow.json');
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback((event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const flow = JSON.parse(e.target.result);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }, [setNodes, setViewport]);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onEdgeClick={onEdgeClick}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={fitViewOptions}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <Background variant={BackgroundVariant.Cross} gap={50} />
        </ReactFlow>
      </div>

      <aside className='toolbar'>
        <div className="description">You can drag these nodes to the pane on the right.</div>
        <div className="dndnode umlNode" onDragStart={(event) => onDragStart(event, 'umlNode')} draggable>
          Class Node
        </div>
        <div className="target">
          <button className='target-button' onClick={() => addArrowToEdge()}>Target</button> {/* Botón para agregar flecha al target */}
        </div>
        <div className="controls">
          <button onClick={onSave}>Save</button>
          <input type="file" accept=".json" onChange={onRestore} />
        </div>
      </aside>
    </div>
  );
};

const WrappedDnDFlow = () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);

export default WrappedDnDFlow;
