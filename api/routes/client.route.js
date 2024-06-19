import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createClient,
  getClient,
  getClients,
} from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", verifyToken, createClient);
router.get("/:id", verifyToken, getClient);
router.get("/", verifyToken, getClients);

export default router;
