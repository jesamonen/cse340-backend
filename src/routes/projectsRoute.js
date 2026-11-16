import express from "express";
import { buildProjects } from "../controllers/projectsController.js";

const router = express.Router();

// Display all service projects
router.get("/", buildProjects);

export default router;