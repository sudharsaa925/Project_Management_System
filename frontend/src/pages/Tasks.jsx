import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeContext from "../context/DarkModeContext";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: ${(props) => (props.darkMode ? "#121212" : "#f4f4f4")};
  color: ${(props) => (props.darkMode ? "#ffffff" : "#333")};
  transition: background 0.3s ease;
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${(props) => (props.darkMode ? "#1f1f1f" : "#0066cc")};
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.darkMode ? "#333" : "#0044cc")};
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
`;

const TaskCreationSection = styled.div`
  flex: 1;
  max-width: 450px;
  background: ${(props) => (props.darkMode ? "#2c2c2c" : "#fff")};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${(props) => (props.darkMode ? "0 4px 10px rgba(255, 255, 255, 0.1)" : "0 4px 10px rgba(0, 0, 0, 0.1)")};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const TaskContainer = styled.div`
  flex: 2;
  max-width: 900px;
  width: 100%;
`;

const TaskCard = styled.div`
  background: ${(props) => (props.darkMode ? "#2c2c2c" : "#fff")};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${(props) => (props.darkMode ? "0 4px 10px rgba(255, 255, 255, 0.1)" : "0 4px 10px rgba(0, 0, 0, 0.1)")};
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TaskTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const TaskDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: ${(props) => (props.darkMode ? "#ddd" : "#666")};
`;

const TaskDate = styled.p`
  font-size: 0.9rem;
  color: white;
`;

const TaskDeadline = styled.p`
  font-size: 0.9rem;
  color: white;
`;

const TaskActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskButton = styled.button`
  background: ${(props) => (props.completed ? "#1db954" : "#0066cc")};
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => (props.completed ? "#17a747" : "#0044cc")};
  }
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  border: none;
  transition: 0.3s ease-in-out;

  &:hover {
    background: darkred;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;

const Progress = styled.div`
  height: 100%;
  background: #1db954;
  width: ${(props) => props.progress}% !important;
  transition: width 0.5s ease-in-out;
`;

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  height: 100px;
`;

const SubmitButton = styled.button`
  background: #0066cc;
  color: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background: #0044cc;
  }
`;

function Tasks() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    createdAt: "",
    deadline: "",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      createdAt: newTask.createdAt,
      deadline: newTask.deadline,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask({
      title: "",
      description: "",
      createdAt: "",
      deadline: "",
    });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <Layout darkMode={darkMode}>
      <Sidebar darkMode={darkMode}>
        <h2>✅ Tasks</h2>
        <SidebarButton onClick={() => navigate("/dashboard")}>📊 Dashboard</SidebarButton>
        <SidebarButton onClick={() => navigate("/projects")}>📁 Projects</SidebarButton>
        <SidebarButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </SidebarButton>
      </Sidebar>

      <Content>
        <TaskCreationSection darkMode={darkMode}>
          <h3>Create New Task</h3>
          <TaskForm onSubmit={addTask}>
            <Input
              type="text"
              name="title"
              placeholder="Task name"
              value={newTask.title}
              onChange={handleChange}
            />
            <TextArea
              name="description"
              placeholder="Task description"
              value={newTask.description}
              onChange={handleChange}
            />
            <Input
              type="datetime-local"
              name="createdAt"
              value={newTask.createdAt}
              onChange={handleChange}
            />
            <Input
              type="datetime-local"
              name="deadline"
              value={newTask.deadline}
              onChange={handleChange}
            />
            <SubmitButton type="submit">Add Task</SubmitButton>
          </TaskForm>
        </TaskCreationSection>

        <TaskContainer>
          <h3>Task List</h3>
          <ProgressBar>
            <Progress progress={progress} />
          </ProgressBar>

          {tasks.map((task) => (
            <TaskCard key={task.id} darkMode={darkMode}>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription darkMode={darkMode}>{task.description}</TaskDescription>
              <TaskDate>Created: {task.createdAt}</TaskDate>
              <TaskDeadline>Deadline: {task.deadline}</TaskDeadline>

              <TaskActionContainer>
                <TaskButton
                  completed={task.completed}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? "✅ Done" : "Mark as Done"}
                </TaskButton>
                <DeleteButton onClick={() => deleteTask(task.id)}>🗑️</DeleteButton>
              </TaskActionContainer>
            </TaskCard>
          ))}
        </TaskContainer>
      </Content>
    </Layout>
  );
}

export default Tasks;
