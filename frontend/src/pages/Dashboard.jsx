import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-100px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Styled Components
const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: ${(props) => (props.darkMode ? "#121212" : "#f4f4f4")};
  color: ${(props) => (props.darkMode ? "#ffffff" : "#333")};
  transition: background 0.3s ease;
`;

// Sidebar
const Sidebar = styled.div`
  width: 250px;
  background: ${(props) => (props.darkMode ? "#1f1f1f" : "#007bff")};
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideIn} 0.5s ease-in-out;

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.darkMode ? "#333" : "#0051cc")};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => (props.darkMode ? "#444" : "#003ea5")};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: #ff6a00;
  color: white;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    background: #ee0979;
  }
`;

function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Fetch dark mode state from backend on load
  useEffect(() => {
    fetch("http://localhost:5000/api/darkmode")
      .then((res) => res.json())
      .then((data) => setDarkMode(data.darkMode))
      .catch((err) => console.error("Error fetching dark mode:", err));
  }, []);

  // Toggle dark mode and update backend
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    fetch("http://localhost:5000/api/darkmode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ darkMode: newMode }),
    }).catch((err) => console.error("Error updating dark mode:", err));
  };

  return (
    <Layout darkMode={darkMode}>
      <Sidebar darkMode={darkMode}>
        <h2>📊 Dashboard</h2>
        <SidebarButton darkMode={darkMode} onClick={() => navigate("/projects")}>
          📁 Projects
        </SidebarButton>
        <SidebarButton darkMode={darkMode} onClick={() => navigate("/tasks")}>
          ✅ Tasks
        </SidebarButton>
        <SidebarButton darkMode={darkMode} onClick={() => navigate("/profile")}>
          👤 Profile
        </SidebarButton>
        <SidebarButton darkMode={darkMode} onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </SidebarButton>
        <SidebarButton darkMode={darkMode} onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </SidebarButton>
      </Sidebar>

      <Content>
        <h1>Welcome to Your Dashboard 🎉</h1>
        <p>Track your projects, tasks, and progress in one place.</p>
      </Content>

      <FloatingAddButton onClick={() => alert("New Task/Project Coming Soon!")}>
        ➕
      </FloatingAddButton>
    </Layout>
  );
}

export default Dashboard;
