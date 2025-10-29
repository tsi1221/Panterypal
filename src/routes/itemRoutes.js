import express from "express";
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getExpiringItems
} from "../controllers/itemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.route("/")
  .get(getItems)
  .post(createItem);

router.route("/alerts/soon")
  .get(getExpiringItems);

router.route("/:id")
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

export default router;
