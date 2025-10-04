import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "./StationDesigner.css";

const StationDesigner = ({ selectedDesign, onDesignUpdate, onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeType, setSelectedNodeType] = useState(null);

  // Available parts (node types)
  const partsLibrary = [
    { id: "room", name: "Room", color: "#4CAF50", icon: "🏠" },
    { id: "wall", name: "Wall", color: "#795548", icon: "🧱" },
    { id: "door", name: "Door", color: "#8D6E63", icon: "🚪" },
    { id: "window", name: "Window", color: "#81C784", icon: "🪟" },
    { id: "furniture", name: "Furniture", color: "#FFB74D", icon: "🪑" },
    { id: "appliance", name: "Appliance", color: "#64B5F6", icon: "🔌" },
    { id: "fixture", name: "Fixture", color: "#FFD54F", icon: "💡" },
    { id: "structure", name: "Structure", color: "#90A4AE", icon: "🏗️" },
  ];

  // Initialize design from props
  useEffect(() => {
    if (selectedDesign) {
      setNodes(selectedDesign.elements || []);
      setEdges(selectedDesign.connections || []);
    }
  }, [selectedDesign]);

  // Add new node to canvas
  const addNode = (partType) => {
    const part = partsLibrary.find((p) => p.id === partType);
    if (!part) return;

    const newNode = {
      id: `${part.id}_${Date.now()}`,
      type: "default",
      data: { label: `${part.icon} ${part.name}` },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      style: {
        background: part.color,
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        border: "2px solid #333",
        fontWeight: "bold",
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Handle connection
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  // Save design
  const handleSave = () => {
    const designData = {
      ...selectedDesign,
      elements: nodes,
      connections: edges,
      partsCount: nodes.length,
    };
    onDesignUpdate(designData);
  };

  // Delete all nodes
  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="station-designer">
      {/* HEADER */}
      <div className="designer-header">
        <div className="header-left">
          <h2>🚀 Space Station Designer</h2>
          <div className="design-info">
            <span>{selectedDesign?.name || "Untitled Design"}</span>
            <span>Parts: {nodes.length}</span>
          </div>
        </div>
        <div className="header-right">
          <button onClick={onClose} className="action-btn secondary">
            ← Back
          </button>
          <button onClick={handleSave} className="action-btn primary">
            💾 Save Design
          </button>
          <button onClick={clearCanvas} className="action-btn danger">
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="designer-content">
        {/* SIDEBAR */}
        <div className="parts-palette">
          <h3>🛠️ Station Parts</h3>
          <div className="parts-grid">
            {partsLibrary.map((part) => (
              <div
                key={part.id}
                className="part-item"
                style={{ borderColor: part.color }}
                onClick={() => addNode(part.id)}
              >
                <div
                  className="part-item-icon"
                  style={{ backgroundColor: part.color }}
                >
                  {part.icon}
                </div>
                <div className="part-item-name">{part.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CANVAS */}
        <div className="design-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <MiniMap
              nodeColor={(n) => n.style?.background || "#888"}
              nodeStrokeWidth={2}
            />
            <Controls />
            <Background gap={16} color="#aaa" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default StationDesigner;
