import { useState, useRef, useCallback } from 'react';
import { Button } from 'antd';
import { ToolOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import CustomHeader from '../../Components/header/Header.js';
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
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const edgeUpdateSuccessful = useRef(true);
  const { setViewport } = useReactFlow();

  const fitViewOptions = { padding: 4 };
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: 'custom', markerEnd: { type: MarkerType.Arrow } }, eds)),
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
      }
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

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });

      const newNode = {
        id: getId(),
        type,
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
    [reactFlowInstance]
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

  const handleContextMenu = (event, edge) => {
    event.preventDefault();
    setSelectedEdge(edge.id);
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
  };

  const handleDeleteEdge = () => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge));
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  const addArrowToEdge = useCallback(() => {
    if (selectedEdge) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === selectedEdge) {
            console.log("Type: " + (edge.markerEnd?.type || 'none'));
            return {
              ...edge,
              markerEnd: {
                type: edge.markerEnd?.type === MarkerType.Arrow ? MarkerType.None : MarkerType.Arrow,
              },
            };
          }
          return edge;
        })
      );
      setContextMenu({ visible: false, x: 0, y: 0 });
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

  const onExport = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      downloadJson(flow, 'flow.json');
    }
  };

  const onImport = useCallback((event) => {
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

  const items = [
    {
      key: 'sub1',
      label: 'Elements',
      icon: <ToolOutlined />,
      children: [
        {
          key: 'g1',
          label: 'UML tools',
          type: 'group',
          children: [
            {
              key: '1',
              label: (
                <div
                  draggable
                  onDragStart={(event) => onDragStart(event, 'newNode')}
                >
                  Simple Class
                </div>
              ),
            },
            {
              key: '2',
              label: 'Active Class',
            },
            {
              key: '3',
              label: 'Interface',
            },
            {
              key: '4',
              label: 'Simple Interface',
            },
            {
              key: '5',
              label: 'Package',
            },

          ],
        },
        {
          key: 'g2',
          label: 'Relationships',
          type: 'group',
          children: [
            {
              key: '6',
              label: 'Inheritance',
            },
            {
              key: '7',
              label: 'Association',
            },
            {
              key: '8',
              label: 'Aggregation',
            },
            {
              key: '9',
              label: 'Composition',
            },
          ],
        },
      ],
    },

  ];



  return (
    <>
      <CustomHeader />

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
            onEdgeContextMenu={handleContextMenu}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={fitViewOptions}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <div className="controls-top-right">
              <Controls />
            </div>

            <Background variant={BackgroundVariant.Cross} gap={50} />
          </ReactFlow>
          {contextMenu.visible && (
            <div
              className="context-menu show"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <div className="context-menu-item" onClick={addArrowToEdge}>
                Quitar dirección
              </div>
              <div className="context-menu-item" onClick={handleDeleteEdge}>
                Eliminar Flecha
              </div>
            </div>
          )}
        </div>

        <aside className='toolbar'>
          <Menu
            onClick={(e) => {
              const selectedItem = items
                .flatMap(item => item.children || [])
                .flatMap(child => child.children || [child])
                .find(child => child.key === e.key);

              if (selectedItem && selectedItem.onClick) {
                selectedItem.onClick(e);
              } else {
                console.log('Menu item clicked:', e);
              }
            }}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />

          <div className="right-t">
            <Button icon={<UploadOutlined />} onClick={onExport}>
              Export
            </Button>
            <input icon={<DownloadOutlined />} type="file" accept=".json" onChange={onImport} />
          </div>
        </aside>
      </div>
    </>
  );
};

const WrappedDnDFlow = () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);

export default WrappedDnDFlow;
