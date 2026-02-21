import express, { Router } from "express";
import { getHealthCheck } from "../controllers/itemController";

const router:Router = express.Router();

router.get("/health", getHealthCheck);

export default router;