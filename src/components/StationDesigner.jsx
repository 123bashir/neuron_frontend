import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import 'reactflow/dist/style.css';
import './StationDesigner.css';

const StationDesigner = ({ selectedDesign = null, onDesignUpdate = () => {}, onClose = () => {} }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const flowWrapperRef = useRef(null);
  const reactFlowInstance = useRef(null);

  const [selectedNodeType, setSelectedNodeType] = useState(null);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });

  const [showMenu, setShowMenu] = useState(false);
  const [showFABTools, setShowFABTools] = useState(false);
  const [activeToolGroup, setActiveToolGroup] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [savedWorks, setSavedWorks] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [currentDesignId, setCurrentDesignId] = useState(selectedDesign?.id || null);

  const toolGroups = [
    {
      id: 'power',
      name: 'Power',
      tools: [
        { id: 'transformer', name: 'Transformer', icon: '🔌', color: '#FF8A65' },
        { id: 'solar_panel', name: 'Solar Panel', icon: '🔋', color: '#FFD54F' },
        { id: 'battery', name: 'Battery', icon: '🔋', color: '#FFB74D' },
      ],
    },
    {
      id: 'home',
      name: 'Habitat',
      tools: [
        { id: 'window', name: 'Window', icon: '🪟', color: '#81C784' },
        { id: 'door', name: 'Door', icon: '🚪', color: '#8D6E63' },
        { id: 'bed', name: 'Bed', icon: '🛏️', color: '#A1887F' },
        { id: 'chair', name: 'Chair', icon: '🪑', color: '#FFB74D' },
      ],
    },
    {
      id: 'structure',
      name: 'Structure',
      tools: [
        { id: 'wall', name: 'Wall', icon: '🧱', color: '#795548' },
        { id: 'corridor', name: 'Corridor', icon: '↔️', color: '#90A4AE' },
        { id: 'module', name: 'Module', icon: '🏗️', color: '#90CAF9' },
      ],
    },
    {
      id: 'life_support',
      name: 'Life Support',
      tools: [
        { id: 'oxygen_generator', name: 'O2 Generator', icon: '🫧', color: '#4dd0e1' },
        { id: 'co2_scrubber', name: 'CO2 Scrubber', icon: '🧪', color: '#26a69a' },
        { id: 'water_recycler', name: 'Water Recycler', icon: '💧', color: '#42a5f5' },
      ],
    },
    {
      id: 'science',
      name: 'Science',
      tools: [
        { id: 'lab_bench', name: 'Lab Bench', icon: '🔬', color: '#ab47bc' },
        { id: 'telescope', name: 'Telescope', icon: '🔭', color: '#7e57c2' },
        { id: 'sensor_array', name: 'Sensor Array', icon: '📡', color: '#29b6f6' },
      ],
    },
    {
      id: 'rover',
      name: 'Robotics',
      tools: [
        { id: 'robot_arm', name: 'Robot Arm', icon: '🦾', color: '#ff7043' },
        { id: 'rover', name: 'Rover', icon: '🚗', color: '#8d6e63' },
        { id: 'drone', name: 'Drone', icon: '🛸', color: '#90a4ae' },
      ],
    },
  ];

  useEffect(() => {
    if (selectedDesign) {
      setNodes(Array.isArray(selectedDesign.elements) ? selectedDesign.elements : []);
      setEdges(Array.isArray(selectedDesign.connections) ? selectedDesign.connections : []);
    }
  }, [selectedDesign]);

  // Delete nodes with Delete / Backspace
  useEffect(() => {
    const handler = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selection.nodes.length > 0) {
        const idsToRemove = new Set(selection.nodes.map(n => n.id));
        setNodes(nds => nds.filter(n => !idsToRemove.has(n.id)));
        setEdges(eds => eds.filter(e => !idsToRemove.has(e.source) && !idsToRemove.has(e.target)));
        setSelection({ nodes: [], edges: [] });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selection]);

  const addNode = (partType) => {
    const part = toolGroups.flatMap(g => g.tools).find(t => t.id === partType);
    if (!part) return;

    let position = { x: Math.random() * 400, y: Math.random() * 400 };
    try {
      if (reactFlowInstance.current && flowWrapperRef.current) {
        const rect = flowWrapperRef.current.getBoundingClientRect();
        if (typeof reactFlowInstance.current.project === 'function') {
          position = reactFlowInstance.current.project({ x: rect.left + rect.width/2, y: rect.top + rect.height/2 });
        } else {
          position = { x: rect.width/2, y: rect.height/2 };
        }
      }
    } catch {}

    const newNode = {
      id: `${part.id}_${Date.now()}`,
      type: 'default',
      data: { label: `${part.icon} ${part.name}` },
      position,
      style: {
        background: part.color,
        color: "#042a2f",
        padding: 10,
        borderRadius: 8,
        border: "2px solid rgba(0,0,0,0.2)",
        fontWeight: 700,
        boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
      }
    };
    setNodes(nds => [...nds, newNode]);
  };

  const deleteSelected = () => {
    if (!selection.nodes || selection.nodes.length === 0) return;
    const idsToRemove = new Set(selection.nodes.map(n => n.id));
    setNodes(nds => nds.filter(n => !idsToRemove.has(n.id)));
    setEdges(eds => eds.filter(e => !idsToRemove.has(e.source) && !idsToRemove.has(e.target)));
    setSelection({ nodes: [], edges: [] });
  };

  const onToolClick = (tool) => {
    addNode(tool.id);
    setShowFABTools(false);
    setActiveToolGroup(null);
  };

  const onSelectionChange = useCallback(sel => {
    setSelection({ nodes: sel?.nodes || [], edges: sel?.edges || [] });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges(eds => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const fitView = () => {
    if (reactFlowInstance.current) reactFlowInstance.current.fitView({ padding: 0.1 });
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="station-designer">
      {/* Canvas & ReactFlow */}
      <div className="design-canvas">
        <div ref={flowWrapperRef} className={`reactflow-wrapper ${showGrid ? 'show-grid' : ''}`}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            onInit={rfi => reactFlowInstance.current = rfi}
            fitView
            attributionPosition="bottom-left"
          >
            {showMiniMap && <MiniMap nodeColor={n => n.style?.background || "#888"} nodeStrokeWidth={2} />}
            <Controls />
            <Background gap={16} color="#aaa" />
          </ReactFlow>
        </div>
      </div>

      {/* FAB Button */}
      <button className="fab" onClick={() => setShowFABTools(s => !s)}>+</button>

      {/* FAB Tools Panel */}
      {showFABTools && (
        <div className="fab-tools-panel">
          <div className="fab-categories">
            {toolGroups.map(g => (
              <button
                key={g.id}
                className={`category-btn ${activeToolGroup === g.id ? 'active' : ''}`}
                onClick={() => setActiveToolGroup(activeToolGroup === g.id ? null : g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
          <div className="fab-tools-right">
            {activeToolGroup ? (
              <div className="tools-grid">
                {toolGroups.find(g => g.id === activeToolGroup).tools.map(tool => (
                  <button key={tool.id} className="tool-card" onClick={() => onToolClick(tool)}>
                    <div className="tool-card-icon" style={{ backgroundColor: tool.color }}>{tool.icon}</div>
                    <div className="tool-card-name">{tool.name}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="tools-empty">Select a category to show tools</div>
            )}
          </div>
        </div>
      )}

      {/* Selection Toolbar */}
      {selection.nodes && selection.nodes.length > 0 && (
        <div className="selection-toolbar">
          <div className="selection-count">{selection.nodes.length} selected</div>
          <button className="delete-selected" onClick={deleteSelected}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default StationDesigner;
