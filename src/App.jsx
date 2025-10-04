import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./routes/landing";
import Login from "./routes/login";
import Register from "./routes/register";
import About from "./routes/about";
import Contact from "./routes/contact";
import StationDesigner from "./components/StationDesigner";
import Features from "./routes/features";
import NotFound from "./routes/NotFound";



// ProtectedRoute uses AuthContext
const ProtectedRoute = ({ element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }
  
  return currentUser ? element : <Navigate to="/login" replace />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/features", element: <Features /> },
  { path: "/dashboard", element: <ProtectedRoute element={<StationDesigner />} /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <div className="earth-loader">
            <div className="stars"></div>
            <div className="earth-container">
              <div className="earth">
                <div className="earth-surface"></div>
                <div className="earth-clouds"></div>
                <div className="earth-atmosphere"></div>
                <div className="earth-glow"></div>
              </div>
              <div className="orbit-ring outer"></div>
              <div className="orbit-ring inner"></div>
              <div className="satellite"></div>
            </div>
          </div>

          <style>{`
            body {
              overflow: hidden;
            }
            
            .earth-loader {
              position: relative;
              width: 300px;
              height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
              perspective: 1000px;
            }
            
            .stars {
              position: absolute;
              width: 100%;
              height: 100%;
              background: 
                radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                radial-gradient(2px 2px at 160px 30px, #fff, transparent);
              background-repeat: repeat;
              background-size: 200px 100px;
              animation: twinkle 4s ease-in-out infinite alternate;
            }
            
            .earth-container {
              position: relative;
              width: 200px;
              height: 200px;
              transform-style: preserve-3d;
              animation: float 6s ease-in-out infinite;
            }
            
            .earth {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              position: relative;
              animation: rotate 8s linear infinite;
              background: 
                radial-gradient(circle at 30% 30%, #1e3c72 0%, #2a5298 25%, #4a90e2 50%, #2a5298 75%, #1e3c72 100%);
              box-shadow: 
                0 0 60px rgba(74, 144, 226, 0.8),
                0 0 120px rgba(74, 144, 226, 0.4),
                inset -20px -20px 40px rgba(0, 0, 0, 0.4),
                inset 20px 20px 40px rgba(255, 255, 255, 0.2);
              transform: translateZ(0);
            }
            
            .earth-surface {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: 
                radial-gradient(circle at 25% 25%, rgba(34, 139, 34, 0.9) 0%, transparent 60%),
                radial-gradient(circle at 75% 15%, rgba(34, 139, 34, 0.7) 0%, transparent 50%),
                radial-gradient(circle at 15% 75%, rgba(34, 139, 34, 0.8) 0%, transparent 55%),
                radial-gradient(circle at 85% 85%, rgba(34, 139, 34, 0.6) 0%, transparent 45%),
                radial-gradient(circle at 50% 10%, rgba(34, 139, 34, 0.5) 0%, transparent 40%),
                radial-gradient(circle at 10% 50%, rgba(34, 139, 34, 0.7) 0%, transparent 50%);
              animation: surfaceRotate 12s linear infinite reverse;
            }
            
            .earth-clouds {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: 
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 30%),
                radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.25) 0%, transparent 35%);
              animation: cloudRotate 15s linear infinite;
            }
            
            .earth-atmosphere {
              position: absolute;
              top: -15px;
              left: -15px;
              width: 150px;
              height: 150px;
              border-radius: 50%;
              background: 
                radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, rgba(135, 206, 235, 0.1) 50%, transparent 70%);
              animation: atmospherePulse 4s ease-in-out infinite;
            }
            
            .earth-glow {
              position: absolute;
              top: -30px;
              left: -30px;
              width: 180px;
              height: 180px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(74, 144, 226, 0.2) 0%, transparent 60%);
              animation: glowPulse 3s ease-in-out infinite;
            }
            
            .orbit-ring {
              position: absolute;
              border-radius: 50%;
              border: 1px solid rgba(74, 144, 226, 0.4);
              animation: orbitRotate 10s linear infinite;
            }
            
            .orbit-ring.outer {
              width: 200px;
              height: 200px;
              top: 0;
              left: 0;
              box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
            }
            
            .orbit-ring.inner {
              width: 160px;
              height: 160px;
              top: 20px;
              left: 20px;
              border-color: rgba(135, 206, 235, 0.3);
              animation-direction: reverse;
              animation-duration: 8s;
            }
            
            .satellite {
              position: absolute;
              top: -5px;
              left: 50%;
              width: 8px;
              height: 8px;
              background: linear-gradient(45deg, #ffd700, #ffed4e);
              border-radius: 50%;
              transform: translateX(-50%);
              box-shadow: 
                0 0 15px rgba(255, 215, 0, 0.8),
                0 0 30px rgba(255, 215, 0, 0.4);
              animation: satelliteOrbit 10s linear infinite;
            }
            
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes surfaceRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes cloudRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes atmospherePulse {
              0%, 100% { 
                opacity: 0.4;
                transform: scale(1);
              }
              50% { 
                opacity: 0.8;
                transform: scale(1.1);
              }
            }
            
            @keyframes glowPulse {
              0%, 100% { 
                opacity: 0.2;
                transform: scale(1);
              }
              50% { 
                opacity: 0.6;
                transform: scale(1.2);
              }
            }
            
            @keyframes orbitRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            @keyframes satelliteOrbit {
              from { transform: translateX(-50%) rotate(0deg) translateX(100px) rotate(0deg); }
              to { transform: translateX(-50%) rotate(360deg) translateX(100px) rotate(-360deg); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotateX(0deg); }
              50% { transform: translateY(-20px) rotateX(5deg); }
            }
            
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
