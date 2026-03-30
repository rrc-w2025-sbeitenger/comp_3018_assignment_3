/**
 * @openapi
 * components:
 *   schemas:
 *     EventResponse:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *         - registrationCount
 *         - status
 *         - category
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: evt_00001
 *         name:
 *           type: string
 *           example: Tech Conference 2026
 *         date:
 *           type: string
 *           format: date-time
 *           example: '2026-01-26T00:00:00.000Z'
 *         capacity:
 *           type: integer
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           example: 25
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: conference
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2026-01-00T00:00:00.000Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: '2026-01-26T00:00:00.000Z'
 */
//for get document by id.
export interface EventResponse {
    id: string,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    status: string,
    category: string,
    createdAt: string,
    updatedAt: string,
}