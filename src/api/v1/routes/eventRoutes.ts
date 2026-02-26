import express, { Router } from "express";
import { 
    getHealthCheck,
     createEvent
     } from "../controllers/eventController";

import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";

const router:Router = express.Router();

router.get("/health", getHealthCheck);
router.post("/events", validateRequest(eventSchemas.create), createEvent);

export default router;