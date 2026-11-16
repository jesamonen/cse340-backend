import express from "express";
import { buildOrganizationDetail } from "../controllers/organizationController.js";

const router = express.Router();

// Display one organization and its projects
router.get("/:id", buildOrganizationDetail);

export default router;