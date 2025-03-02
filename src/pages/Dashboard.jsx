import React, { useState } from "react";
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

// Main Content
const Content = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Dashboard Stats
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background: ${(props) => (props.darkMode ? "#252525" : "#fff")};
  padding: 20px;
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.darkMode
      ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
      : "0px 4px 10px rgba(0, 0, 0, 0.1)"};
  animation: ${fadeIn} 0.5s ease-in-out;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => (props.darkMode ? "#1db954" : "#007bff")};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${(props) => (props.darkMode ? "#333" : "#ddd")};
  border-radius: 5px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;

  div {
    width: ${(props) => props.progress}%;
    height: 100%;
    background: ${(props) => (props.darkMode ? "#1db954" : "#007bff")};
    border-radius: 5px;
    transition: width 0.5s ease-in-out;
  }
`;

// Floating Add Button
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
  const [projectsCount, setProjectsCount] = useState(5);
  const [tasksCompleted, setTasksCompleted] = useState(65);

  return (
    <Layout darkMode={darkMode}>
      {/* Sidebar */}
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
        <SidebarButton darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </SidebarButton>
      </Sidebar>

      {/* Main Content */}
      <Content>
        <h1>Welcome to Your Dashboard 🎉</h1>
        <p>Track your projects, tasks, and progress in one place.</p>

        {/* Dashboard Stats */}
        <DashboardGrid>
          <StatCard darkMode={darkMode}>
            <StatTitle>📌 Total Projects</StatTitle>
            <StatValue>{projectsCount}</StatValue>
          </StatCard>
          <StatCard darkMode={darkMode}>
            <StatTitle>✅ Completed Tasks</StatTitle>
            <StatValue>{tasksCompleted}%</StatValue>
            <ProgressBar darkMode={darkMode} progress={tasksCompleted}>
              <div></div>
            </ProgressBar>
          </StatCard>
          <StatCard darkMode={darkMode}>
            <StatTitle>⏳ Pending Tasks</StatTitle>
            <StatValue>{100 - tasksCompleted}%</StatValue>
            <ProgressBar darkMode={darkMode} progress={100 - tasksCompleted}>
              <div></div>
            </ProgressBar>
          </StatCard>
        </DashboardGrid>
      </Content>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => alert("New Task/Project Coming Soon!")}>➕</FloatingAddButton>
    </Layout>
  );
}

export default Dashboard;
