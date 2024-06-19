import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getAllVisits } from "../controllers/client.controller.js";
import { getClientVisitDetails } from "../controllers/clientVisit.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAllVisits);
router.get("/managers", verifyToken, getClientVisitDetails);

export default router;
