/**
 * @openapi
 * components:
 *   schemas:
 *     EventCreateRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Name of the event
 *           example: 'Tech Conference 2026'
 *         date:
 *           type: string
 *           format: date-time
 *           description: Must be a future date in ISO format
 *           example: '2026-12-01T09:00:00.000Z'
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           description: Maximum number of attendees
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           description: Current number of registrations, must not exceed capacity
 *           example: 50
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           description: Current status of the event
 *           example: 'active'
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           description: Category of the event
 *           example: 'conference'
 */
//use for create/post.
export interface eventCreateRequest{
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string,
}