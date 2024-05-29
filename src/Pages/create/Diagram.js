import React, { useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import createEngine, { 
    DefaultNodeModel, 
    DefaultLinkModel 
} from '@projectstorm/react-diagrams';
import '@projectstorm/react-diagrams/dist/style.min.css';

const Diagram = () => {
    const engine = createEngine();
    const model = new DiagramModel();

    // Example nodes and link
    const node1 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,192,255)',
    });
    node1.setPosition(100, 100);
    const port1 = node1.addOutPort('Out');

    const node2 = new DefaultNodeModel({
        name: 'Node 2',
        color: 'rgb(192,255,0)',
    });
    node2.setPosition(400, 100);
    const port2 = node2.addInPort('In');

    const link = port1.link(port2);
    model.addAll(node1, node2, link);

    engine.setModel(model);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <CanvasWidget engine={engine} />
        </div>
    );
};

export default Diagram;
