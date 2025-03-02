const mongoose = require("mongoose");

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  profilePic: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ Project Schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", ProjectSchema);

// ✅ Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Todo", "In Progress", "Done"], default: "Todo" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});
const Task = mongoose.model("Task", TaskSchema);

module.exports = { User, Project, Task };
