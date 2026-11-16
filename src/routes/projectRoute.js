import express from "express";
import { buildProjectDetail } from "../controllers/projectController.js";

const router = express.Router();

// Display one service project
router.get("/:id", buildProjectDetail);

export default router;