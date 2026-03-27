import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";
import { 
    getHealthCheck,
     createEvent,
      getAllEvents,
       getEventById,
        updateEvent,
         deleteEvent
     } from "../controllers/eventController";

const router:Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Returns the health status of the server
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Server is running and accepting requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/HealthCheckResponse'
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *             example:
 *               status: success
 *               data:
 *                 status: 200
 *                 uptime: 3724.58
 *                 timestamp: '2026-01-10T00:00:00.000Z'
 *                 version: '1.0.0'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/health", getHealthCheck);
router.post("/events", validateRequest(eventSchemas.create), createEvent);
router.get("/events", validateRequest(eventSchemas.create), getAllEvents);
router.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);
router.put("/events/:id", validateRequest(eventSchemas.update), updateEvent);
router.delete("/events/:id", validateRequest(eventSchemas.delete), deleteEvent);
export default router;