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

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventDTO'
 *             example:
 *               status: success
 *               data:
 *                 id: 3
 *                 name: 'conference meeting'
 *                 date: '2026-01-10T00:00:00.000Z'
 *                 capacity: 200
 *                 registrationCount: 150
 *                 status: 'active'
 *                 category: 'conference'
 *                 createdAt: '2025-01-10T00:00:00.000Z'
 *                 updatedAt: '2025-09-10T00:00:00.000Z'
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
router.get("/events", validateRequest(eventSchemas.create), getAllEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get an event by id
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: evt_00006
 *     responses:
 *       '200':
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/EventResponse'
 *             example:
 *               status: success
 *               data:
 *                 id: evt_00006
 *                 name: 'conference meeting'
 *                 date: '2026-01-10T00:00:00.000Z'
 *                 capacity: 200
 *                 registrationCount: 150
 *                 status: 'active'
 *                 category: 'conference'
 *                 createdAt: '2025-01-10T00:00:00.000Z'
 *                 updatedAt: '2025-09-10T00:00:00.000Z'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error Valid Id is required.
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
router.get("/events/:id", validateRequest(eventSchemas.getById), getEventById);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Conference 2026
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: '2026-04-15T10:00:00.000Z'
 *               capacity:
 *                 type: integer
 *                 example: 100
 *               registrationCount:
 *                 type: integer
 *                 example: 25
 *               status:
 *                 type: string
 *                 example: active
 *               category:
 *                 type: string
 *                 example: conference
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/EventDTO'
 *             example:
 *               status: success
 *               data:
 *                 id: 'evt_00007'
 *                 name: 'conference meeting'
 *                 date: '2026-01-10T00:00:00.000Z'
 *                 capacity: 200
 *                 registrationCount: 150
 *                 status: 'active'
 *                 category: 'conference'
 *                 createdAt: '2025-01-10T00:00:00.000Z'
 *                 updatedAt: '2025-09-10T00:00:00.000Z'
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
router.post("/events", validateRequest(eventSchemas.create), createEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an event by id
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: evt_00001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Tech Conference
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: '2026-05-20T09:00:00.000Z'
 *               capacity:
 *                 type: integer
 *                 example: 150
 *               registrationCount:
 *                 type: integer
 *                 example: 50
 *               status:
 *                 type: string
 *                 example: active
 *               category:
 *                 type: string
 *                 example: workshop
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   example:
 *                     id: 'evt_00007'
 *                     date: '2026-01-10T00:00:00.000Z'
 *                     capacity: 200
 *                     registrationCount: 150
 *                     status: 'active'
 *                     category: 'conference'
 *                     name: 'conference meeting'
 *                     createdAt: '2025-01-10T00:00:00.000Z'
 *                     updatedAt: '2025-09-10T00:00:00.000Z'
 *                 message:
 *                   type: string
 *                   example: Entity evt_00005 was updated
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error Valid Id is required.
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
router.put("/events/:id", validateRequest(eventSchemas.update), updateEvent);
router.delete("/events/:id", validateRequest(eventSchemas.delete), deleteEvent);
export default router;