import express from "express";
import { buildHome } from "../controllers/homeController.js";

const router = express.Router();

// Home page route
router.get("/", buildHome);

export default router;