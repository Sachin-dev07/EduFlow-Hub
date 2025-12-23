import express from "express";
import { getResources, createResource } from "../controllers/resourceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getResources).post(protect, createResource);

export default router;
