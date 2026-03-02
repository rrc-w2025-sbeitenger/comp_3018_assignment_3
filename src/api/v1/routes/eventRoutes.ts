import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";
import { 
    getHealthCheck,
     createEvent,
      getAllEvents,
       getEventById,
        updateEvent
     } from "../controllers/eventController";

const router:Router = express.Router();

router.get("/health", getHealthCheck);
router.post("/events", validateRequest(eventSchemas.create), createEvent);
router.get("/events", validateRequest(eventSchemas.create), getAllEvents);
router.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);
router.put("/events/:id", updateEvent);

export default router;