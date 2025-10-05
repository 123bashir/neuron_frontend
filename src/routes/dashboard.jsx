import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModernPopup from "../components/ModernPopup";
import StationDesigner from "../components/StationDesigner";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const backendUrl = "https://neuron-backed.onrender.com"; // Change to your deployed backend URL

  // Get userId from current user

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
      setDesigns(res.data || []);
    } catch (err) {
      console.error("Error fetching designs:", err);
      setDesigns([]);
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
    const defaultName = `New Design - ${new Date().toLocaleString()}`;
    setSelectedDesign({
      name: defaultName,
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
    // replace dashboard UI with a full-viewport embedded ArchViz site
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 9999 }}>
      <iframe
        src="https://threejs-archviz.vercel.app/"
        title="ThreeJS ArchViz"
        style={{ width: '100%', height: '100%', border: '0', display: 'block' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
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
