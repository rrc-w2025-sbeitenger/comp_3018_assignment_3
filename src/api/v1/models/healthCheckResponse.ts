
/**
 * @openapi
 * components:
 *   schemas:
 *     HealthCheckResponse:
 *       type: object
 *       required:
 *         - status
 *         - uptime
 *         - timestamp
 *         - version
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         uptime:
 *           type: number
 *           example: 20.5620736
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: '2026-03-26T22:33:50.348Z'
 *         version:
 *           type: string
 *           example: '1.0.0'
 */
export interface HealthCheckResponse {
    status: number;
    uptime: number;
    timestamp: string;
    version: string;
}