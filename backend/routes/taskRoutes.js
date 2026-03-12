import express from 'express';
import { getTask, addTask, deleteTask } from '../controllers/taskControllers.js';

const router = express.Router();

// GET all records
router.get("/", getTask);

// POST – add new task
router.post("/add", addTask);

// DELETE – delete task by id
router.delete("/delete/:id", deleteTask);

export default router;