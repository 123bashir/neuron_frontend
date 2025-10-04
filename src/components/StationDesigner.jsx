import React, { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./StationDesigner.css";

const StationDesigner = ({ selectedDesign = null, onDesignUpdate = () => {}, onClose = () => {} }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const flowWrapperRef = useRef(null);
  const reactFlowInstance = useRef(null);
  const [selectedNodeType, setSelectedNodeType] = useState(null);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });

  // partsLibrary removed per request; use toolGroups only

  // Tool groups (real world tools)
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

  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth();
  const [showFABTools, setShowFABTools] = useState(false);
  const [activeToolGroup, setActiveToolGroup] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  // saved works UI
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [savedWorks, setSavedWorks] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [currentDesignId, setCurrentDesignId] = useState(selectedDesign?.id || null);

  // Initialize design from props
  useEffect(() => {
    if (selectedDesign) {
      // ensure nodes/edges arrays are valid
      setNodes(Array.isArray(selectedDesign.elements) ? selectedDesign.elements : []);
      setEdges(Array.isArray(selectedDesign.connections) ? selectedDesign.connections : []);
    }
  }, [selectedDesign]);

  // selection keyboard handler (Delete / Backspace)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selection.nodes.length > 0) {
          // delete selected nodes
          const idsToRemove = new Set(selection.nodes.map((n) => n.id));
          setNodes((nds) => nds.filter((n) => !idsToRemove.has(n.id)));
          setEdges((eds) => eds.filter((edge) => !idsToRemove.has(edge.source) && !idsToRemove.has(edge.target)));
          // clear selection
          setSelection({ nodes: [], edges: [] });
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selection, setNodes, setEdges]);

  const API_BASE = import.meta.env.VITE_API_BASE || 'https://neuron-backed.onrender.com';

  const parseMaybeJSON = (val) => {
    if (!val) return [];
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch (e) { return []; }
    }
    return val;
  };

  // Fetch saved works for current user
  const fetchSavedWorks = async () => {
    if (!currentUser?.userId) return alert('Please log in to access saved work');
    setSavedLoading(true);
    try {
      const res = await fetch(`${API_BASE}/list/${currentUser.userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const list = await res.json();
      setSavedWorks(list || []);
      setShowSavedPanel(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load saved works');
    } finally {
      setSavedLoading(false);
    }
  };

  const loadSavedWork = async (id) => {
    if (!currentUser?.userId) return alert('Please log in');
    try {
      const res = await fetch(`${API_BASE}/load/${currentUser.userId}/${id}`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      // Backend returns elements/connections maybe as strings
      const elements = parseMaybeJSON(data.elements);
      const connections = parseMaybeJSON(data.connections);
      setNodes(Array.isArray(elements) ? elements : []);
      setEdges(Array.isArray(connections) ? connections : []);
      setCurrentDesignId(data.id || id);
      setShowSavedPanel(false);
      setShowFABTools(false);
      setActiveToolGroup(null);
    } catch (err) {
      console.error(err);
      alert('Failed to load design');
    }
  };

  // Save (create new) to backend
  const createNewAndSave = async (name) => {
    if (!currentUser?.userId) return alert('Please log in to save');
    const id = Date.now();
    const payload = {
      id,
      userId: currentUser.userId,
      name,
      viewMode: 'designer',
      elements: nodes,
      connections: edges,
      partsCount: nodes.length,
    };
    try {
      const res = await fetch(`${API_BASE}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      setCurrentDesignId(id);
      setShowNewModal(false);
      setNewName('');
      await fetchSavedWorks();
      alert('Design saved');
    } catch (err) {
      console.error(err);
      alert('Failed to save design');
    }
  };

  // Update existing design
  const updateExisting = async () => {
    if (!currentUser?.userId || !currentDesignId) return alert('No design selected to update');
    try {
      const res = await fetch(`${API_BASE}/update/${currentUser.userId}/${currentDesignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: selectedDesign?.name || `Design ${new Date().toLocaleString()}`, viewMode: 'designer', elements: nodes, connections: edges, partsCount: nodes.length }),
      });
      if (!res.ok) throw new Error('Update failed');
      alert('Design updated');
      await fetchSavedWorks();
    } catch (err) {
      console.error(err);
      alert('Failed to update design');
    }
  };

  const addNode = (partType) => {
    // lookup only in toolGroups
    const part = toolGroups.flatMap((g) => g.tools).find((t) => t.id === partType);
    if (!part) return;
    // determine position: center of visible viewport if possible
    let position = { x: Math.random() * 400, y: Math.random() * 400 };
    try {
      if (reactFlowInstance.current && flowWrapperRef.current) {
        const wrapper = flowWrapperRef.current;
        const rect = wrapper.getBoundingClientRect();
        const clientX = rect.left + rect.width / 2;
        const clientY = rect.top + rect.height / 2;
        if (typeof reactFlowInstance.current.project === 'function') {
          position = reactFlowInstance.current.project({ x: clientX, y: clientY });
        } else {
          position = { x: rect.width / 2, y: rect.height / 2 };
        }
      }
    } catch (err) {
      // fallback to random
    }

    const newNode = {
      id: `${part.id}_${Date.now()}`,
      type: "default",
      data: { label: `${part.icon} ${part.name}` },
      position,
      style: {
        background: part.color,
        color: "#042a2f",
        padding: 10,
        borderRadius: 8,
        border: "2px solid rgba(0,0,0,0.2)",
        fontWeight: "700",
        boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Delete currently selected nodes (UI button)
  const deleteSelected = () => {
    if (!selection.nodes || selection.nodes.length === 0) return;
    const idsToRemove = new Set(selection.nodes.map((n) => n.id));
    setNodes((nds) => nds.filter((n) => !idsToRemove.has(n.id)));
    setEdges((eds) => eds.filter((edge) => !idsToRemove.has(edge.source) && !idsToRemove.has(edge.target)));
    setSelection({ nodes: [], edges: [] });
  };

  // Convenience when clicking a tool item from FAB tools
  const onToolClick = (tool) => {
    addNode(tool.id);
    // close panels for quick placement
    setShowFABTools(false);
    setActiveToolGroup(null);
  };

  // track selection using ReactFlow's onNodesChange/selection
  const onSelectionChange = useCallback((sel) => {
    // sel has nodes and edges arrays when available
    setSelection({ nodes: sel?.nodes || [], edges: sel?.edges || [] });
  }, []);

  // Handle connection
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  // Save design
  const handleSave = () => {
    // If we have an existing saved design id, update it; otherwise open Save As modal
    if (currentDesignId) {
      updateExisting();
      return;
    }
    setShowNewModal(true);
  };

  // New design
  const handleNew = () => {
    // prompt for name and save as a new design
    setShowNewModal(true);
  };

  // Export visible canvas as image using html2canvas (dynamically loaded)
  const exportAsImage = async () => {
    const container = flowWrapperRef.current;
    if (!container) return alert('Nothing to export');

    // try to load html2canvas dynamically
    if (typeof window.html2canvas === 'undefined') {
      try {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          s.onload = () => resolve(true);
          s.onerror = () => reject(new Error('Failed to load html2canvas'));
          document.head.appendChild(s);
        });
      } catch (err) {
        console.error(err);
        return alert('Failed to load export library. You can still save the design as JSON.');
      }
    }

    try {
      // @ts-ignore
      const canvas = await window.html2canvas(container, { backgroundColor: null });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${selectedDesign?.name || 'design'}.png`;
      a.click();
    } catch (err) {
      console.error(err);
      alert('Export failed.');
    }
  };

  // fit view helper
  const fitView = () => {
    if (reactFlowInstance.current) reactFlowInstance.current.fitView({ padding: 0.1 });
  };

  // Delete all nodes
  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="station-designer">
      {/* HEADER */}
      {/* Top-left collapsing menu button */}
      <div className="top-left-menu">
        <button className="menu-btn" onClick={() => setShowMenu((s) => !s)}>
          ☰ Menu
        </button>
      </div>

      {/* Collapsible menu panel */}
      <div className={`menu-panel ${showMenu ? 'open' : ''}`}>
        <div className="menu-panel-inner">
          <div className="menu-panel-header">
            <h3>Workspace</h3>
            <button className="close-panel" onClick={() => setShowMenu(false)}>✕</button>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">File</div>
            <div className="menu-section-body">
              <button className="menu-action" onClick={handleSave}>💾 Save</button>
              <button className="menu-action" onClick={handleNew}>🆕 New (Save As)</button>
              <button className="menu-action" onClick={exportAsImage}>📷 Export Image</button>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Library</div>
            <div className="menu-section-body">
              <button className="menu-action" onClick={fetchSavedWorks}>📂 My Saved Work</button>
            </div>
          </div>

          <div className="menu-section collapsible">
            <div className="menu-section-title">View</div>
            <div className="menu-section-body">
              <button className="menu-action" onClick={() => setShowGrid(s => !s)}>▢ Toggle Grid</button>
              <button className="menu-action" onClick={() => setShowMiniMap(s => !s)}>⚡ Toggle MiniMap</button>
              <button className="menu-action" onClick={fitView}>⤢ Fit View</button>
              <button className="menu-action" onClick={clearCanvas}>🧹 Clear</button>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Help</div>
            <div className="menu-section-body">
              <div className="menu-note">Tip: Use + to add parts. Select nodes and press Delete to remove.</div>
            </div>
          </div>
        </div>
      </div>

          <div className="designer-content">
            {/* CANVAS */}
  <div className="design-canvas">
          <div className="canvas-header">
            <div className="canvas-header-left">
              <h3>Design Canvas</h3>
            </div>
            <div className="canvas-header-right">
              <button className="action-btn secondary" onClick={() => setNodes([]) }>Clear</button>
              <button className="action-btn primary" onClick={fitView}>Fit View</button>
            </div>
          </div>

          <div ref={flowWrapperRef} className={`reactflow-wrapper ${showGrid ? 'show-grid' : ''}`}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
                onSelectionChange={onSelectionChange}
              fitView
              attributionPosition="bottom-left"
              onInit={(rfi) => (reactFlowInstance.current = rfi)}
            >
              {showMiniMap && (
                <MiniMap
                  nodeColor={(n) => n.style?.background || "#888"}
                  nodeStrokeWidth={2}
                />
              )}
              <Controls />
              <Background gap={16} color="#aaa" />
            </ReactFlow>
          </div>
        </div>
        {/* Floating bottom-left toolbar (small icons) */}
        <div className="bottom-left-toolbar">
          <button className="small-tool" title="Toggle grid" onClick={() => setShowGrid(s => !s)}>▢</button>
          <button className="small-tool" title="Toggle mini map" onClick={() => setShowMiniMap(s => !s)}>⚡</button>
          <button className="small-tool" onClick={() => reactFlowInstance.current?.fitView()}>⤢</button>
          <div className="parts-counter">{nodes.length} parts</div>
        </div>

        {/* Floating Action Button (big +) */}
        <button
          className="fab"
          onClick={() => setShowFABTools((s) => !s)}
          title="Tools"
        >
          +
        </button>

        {/* FAB Tools panel (modern: left = categories, right = tools shown after clicking a category) */}
        {showFABTools && (
          <div className="fab-tools-panel">
            <div className="fab-categories">
              {toolGroups.map((g) => {
                const icon = g.id === 'power' ? '⚡' : g.id === 'home' ? '🏠' : '🏗️';
                return (
                  <button
                    key={g.id}
                    className={`category-btn ${activeToolGroup === g.id ? 'active' : ''}`}
                    onClick={() => setActiveToolGroup(activeToolGroup === g.id ? null : g.id)}
                    title={g.name}
                  >
                    <div className="category-icon">{icon}</div>
                    <div className="category-label">{g.name}</div>
                  </button>
                );
              })}
            </div>

            <div className="fab-tools-right">
              {activeToolGroup ? (
                <div className="tools-grid">
                  {toolGroups.find((g) => g.id === activeToolGroup).tools.map((tool) => (
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

        {/* Saved works panel */}
        {showSavedPanel && (
          <div className="saved-panel">
            <div className="saved-panel-header">
              <h4>My Saved Designs</h4>
              <button className="tool-btn" onClick={() => setShowSavedPanel(false)}>Close</button>
            </div>
            <div className="saved-list">
              {savedLoading && <div className="saved-empty">Loading…</div>}
              {!savedLoading && savedWorks.length === 0 && <div className="saved-empty">No saved designs yet</div>}
              {!savedLoading && savedWorks.map((s) => (
                <div key={s.id} className="saved-item">
                  <div className="saved-meta">
                    <div className="saved-name">{s.name}</div>
                    <div className="saved-date">{new Date(s.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="saved-actions">
                    <button className="tool-btn" onClick={() => loadSavedWork(s.id)}>Load</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New design modal (Save As) */}
        {showNewModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3>Save New Design</h3>
              <input className="modal-input" placeholder="Design name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="action-btn primary" onClick={() => { if (newName.trim() === '') return alert('Please enter a name'); createNewAndSave(newName); }}>Save</button>
                <button className="action-btn secondary" onClick={() => setShowNewModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Selection toolbar: shows when there's a selection */}
        {selection.nodes && selection.nodes.length > 0 && (
          <div className="selection-toolbar">
            <div className="selection-count">{selection.nodes.length} selected</div>
            <button className="delete-selected" onClick={deleteSelected} title="Delete selected (Del / Backspace)">🗑️ Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationDesigner;
