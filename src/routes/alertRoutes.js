import express from "express";
import { getUserAlerts, markAlertSeen } from "../controllers/alertController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getUserAlerts);
router.put("/:id/seen", markAlertSeen);

export default router;
