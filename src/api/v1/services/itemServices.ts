import { HTTP_STATUS } from "../../../constants/httpConstant";

export interface HealthCheckResponse {
    status: number;
    uptime: number;
    timestamp: string;
    version: string;
}

/*
*Creates and returns the health status.
*@returns a healthCheckResponse object.
*/
export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}