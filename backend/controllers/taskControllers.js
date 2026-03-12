import Task from "../models/Task.js"

// GET all records
export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ message: "All tasks fetched successfully", data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Server side error", error: error.message });
    }
};

// POST – add new task
export const addTask = async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title });   // shorthand property
        const taskSaved = await newTask.save();
        res.status(201).json({ message: "Task saved successfully", data: taskSaved });
    } catch (error) {
        res.status(500).json({ message: "Server side error", error: error.message });
    }
};

// DELETE – delete task by id
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server side error", error: error.message });
    }
};