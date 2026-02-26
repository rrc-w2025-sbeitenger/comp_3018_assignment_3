import { HTTP_STATUS } from "../../../constants/httpConstant";
import { eventData } from "../models/eventModel";

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

export const createEventService = (
    name: string,
    date: string,
    capacity: number, 
    registrationCount: number, 
    status: string, 
    category:string
): any => {
    const id: string = "evt_" + String(eventData.length + 1).padStart(5, "0");
    //current date.
    const createdAt: Date =  (new Date());
    
    const newEvent: any = {
        id: id,
        name: name,
        date: date,
        capacity: capacity,
        registrationCount: registrationCount,
        status: status,
        category: category,
        createdAt: createdAt,
        updatedAt: createdAt,
    }

    return newEvent;
}