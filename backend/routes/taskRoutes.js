const express = require('express');
const router = express.Router();


const Task = require('../models/taskSchema');   

// GET all records
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ message: "All tasks fetched successfully", data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Server side error", error: error.message });
    }
});

// POST – add new task
router.post("/add", async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title: title });   
        const taskSaved = await newTask.save();
        res.status(201).json({ message: "Task saved successfully", data: taskSaved });
    } catch (error) {
        res.status(500).json({ message: "Server side error", error: error.message });
    }
});

// DELETE – delete task by id
router.delete("/delete/:id", async (req, res) => {
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
});

module.exports = router;