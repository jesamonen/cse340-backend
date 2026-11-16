import express from "express";
import {
  buildOrganizations,
} from "../controllers/organizationsController.js";

const router = express.Router();

// Display all organizations
router.get("/", buildOrganizations);

export default router;