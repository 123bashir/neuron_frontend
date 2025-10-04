import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModernPopup from "../components/ModernPopup";
import StationDesigner from "../components/StationDesigner";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [newDesign, setNewDesign] = useState({
    name: "",
    viewMode: "default",
    elements: [],
    connections: [],
    partsCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });
  const [showStationDesigner, setShowStationDesigner] = useState(false);
  const backendUrl = "http://localhost:5000"; // Change to your deployed backend URL

  // Get userId from current user
  const userId = currentUser?.userId || "user_001";

  const handleLogout = () => {
    // Show logout confirmation popup
    setPopup({
      isOpen: true,
      title: 'Logout Confirmation',
      message: `Are you sure you want to logout, ${currentUser?.firstName}?`,
      type: 'warning',
      showConfirmButton: true,
      onConfirm: confirmLogout
    });
  };

  const confirmLogout = () => {
    // Close the confirmation popup first
    setPopup({ ...popup, isOpen: false });
    
    // Clear user data from context and sessionStorage
    logout();
    
    // Show success popup
    setPopup({
      isOpen: true,
      title: 'Logged Out Successfully! 👋',
      message: 'You have been logged out. Thank you for using Neuron!',
      type: 'success',
      showConfirmButton: false
    });
    
    // Navigate to home page after popup
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Fetch all saved designs
  const fetchDesigns = async () => {
    try {
      const res = await axios.get(`${backendUrl}/list/${userId}`);
      setDesigns(res.data);
    } catch (err) {
      console.error("Error fetching designs:", err);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Save a new design
  const saveDesign = async () => {
    if (!newDesign.name.trim()) return alert("Please enter a design name.");
    setLoading(true);
    try {
      const payload = {
        ...newDesign,
        id: Date.now(),
        createdAt: new Date(),
      };
      await axios.post(`${backendUrl}/save`, { userId, ...payload });
      alert("Design saved successfully!");
      setNewDesign({
        name: "",
        viewMode: "default",
        elements: [],
        connections: [],
        partsCount: 0,
      });
      fetchDesigns();
    } catch (err) {
      console.error("Error saving design:", err);
    }
    setLoading(false);
  };

  // Load a design
  const loadDesign = async (id) => {
    try {
      const res = await axios.get(`${backendUrl}/load/${userId}/${id}`);
      setSelectedDesign(res.data);
      setShowStationDesigner(true);
    } catch (err) {
      console.error("Error loading design:", err);
    }
  };

  // Create new design
  const createNewDesign = () => {
    setSelectedDesign({
      name: "",
      viewMode: "default",
      elements: [],
      connections: [],
      partsCount: 0,
    });
    setShowStationDesigner(true);
  };

  // Handle design updates from designer
  const handleDesignUpdate = (updatedDesign) => {
    setSelectedDesign(updatedDesign);
    fetchDesigns(); // Refresh the designs list
  };

  // Close station designer
  const closeStationDesigner = () => {
    setShowStationDesigner(false);
    setSelectedDesign(null);
  };

  // Update selected design
  const updateDesign = async () => {
    if (!selectedDesign) return alert("Select a design first!");
    setLoading(true);
    try {
      await axios.put(`${backendUrl}/update/${userId}/${selectedDesign.id}`, selectedDesign);
      alert("Design updated successfully!");
      fetchDesigns();
    } catch (err) {
      console.error("Error updating design:", err);
    }
    setLoading(false);
  };

  // Delete design
  const deleteDesign = async (id) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;
    try {
      await axios.delete(`${backendUrl}/delete/${userId}/${id}`);
      alert("Design deleted successfully!");
      fetchDesigns();
    } catch (err) {
      console.error("Error deleting design:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* User Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <h2 style={styles.title}>🧩 Dashboard — Canvas Manager</h2>
          <div style={styles.userDetails}>
            <span style={styles.welcomeText}>
              Welcome, {currentUser?.firstName} {currentUser?.lastName}!
            </span>
            <span style={styles.roleText}>
              {currentUser?.role} at {currentUser?.organization}
            </span>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          🚪 Logout
        </button>
      </div>

      {/* Design Actions */}
      <div style={styles.card}>
        <h3>🚀 Design Actions</h3>
        <div style={styles.actionButtons}>
          <button onClick={createNewDesign} style={styles.primaryButton}>
            🏗️ Create New Design
          </button>
          <div style={styles.divider}>or</div>
          <div style={styles.quickSave}>
            <input
              type="text"
              placeholder="Enter design name"
              value={newDesign.name}
              onChange={(e) => setNewDesign({ ...newDesign, name: e.target.value })}
              style={styles.input}
            />
            <button onClick={saveDesign} disabled={loading} style={styles.button}>
              {loading ? "Saving..." : "💾 Quick Save"}
            </button>
          </div>
        </div>
      </div>

      {/* All Designs */}
      <div style={styles.card}>
        <h3>Saved Designs</h3>
        {designs.length === 0 ? (
          <p>No designs found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>View Mode</th>
                <th>Parts</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design) => (
                <tr key={design.id}>
                  <td>{design.id}</td>
                  <td>{design.name}</td>
                  <td>{design.viewMode}</td>
                  <td>{design.partsCount}</td>
                  <td>{new Date(design.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => loadDesign(design.id)}
                      style={styles.smallButton}
                      title="Open in appropriate designer"
                    >
                      🎨 Open
                    </button>
                    <button
                      onClick={() => deleteDesign(design.id)}
                      style={{ ...styles.smallButton, background: "#dc3545" }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Selected Design */}
      {selectedDesign && (
        <div style={styles.card}>
          <h3>Edit Design: {selectedDesign.name}</h3>
          <input
            type="text"
            value={selectedDesign.name}
            onChange={(e) =>
              setSelectedDesign({ ...selectedDesign, name: e.target.value })
            }
            style={styles.input}
          />
          <input
            type="number"
            value={selectedDesign.partsCount}
            onChange={(e) =>
              setSelectedDesign({
                ...selectedDesign,
                partsCount: parseInt(e.target.value),
              })
            }
            style={styles.input}
            placeholder="Parts Count"
          />
          <button onClick={updateDesign} style={styles.button}>
            Update Design
          </button>
        </div>
      )}

      {/* Architecture Designer */}
      {showStationDesigner && (
        <StationDesigner
          selectedDesign={selectedDesign}
          onDesignUpdate={handleDesignUpdate}
          onClose={closeStationDesigner}
        />
      )}

      {/* Modern Popup */}
      <ModernPopup
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        showConfirmButton={popup.showConfirmButton}
        onConfirm={popup.onConfirm}
        confirmText="Logout"
        cancelText="Cancel"
        autoClose={popup.type === 'success'}
        autoCloseDelay={3000}
      />
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "15px",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  title: {
    margin: "0",
    fontSize: "24px",
    fontWeight: "bold",
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  welcomeText: {
    fontSize: "16px",
    fontWeight: "500",
  },
  roleText: {
    fontSize: "14px",
    opacity: "0.9",
  },
  logoutButton: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  card: {
    background: "#fff",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "10px",
    maxWidth: "900px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  smallButton: {
    marginRight: "5px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  divider: {
    color: "#666",
    fontSize: "14px",
    fontWeight: "500",
  },
  quickSave: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  },
};

export default Dashboard;
