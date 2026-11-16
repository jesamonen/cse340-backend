import express from "express";
import {
  buildCategoryDetail,
} from "../controllers/categoryController.js";

const router = express.Router();

// Display one category and its associated projects
router.get("/:id", buildCategoryDetail);

export default router;
