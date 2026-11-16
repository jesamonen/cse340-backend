import express from "express";
import { buildCategories } from "../controllers/categoriesController.js";

const router = express.Router();

// Display all categories
router.get("/", buildCategories);

export default router;