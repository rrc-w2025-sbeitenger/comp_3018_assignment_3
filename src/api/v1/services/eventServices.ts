import { HTTP_STATUS } from "../../../constants/httpConstant";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
//import { event } from "../models/eventModel";
//import { eventResponse } from "../models/eventResponse";
import { addDocument } from "../repositories/eventRepository";
import { db } from "../../../../config/firebaseConfig";
import { event } from "../models/eventModel";

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

export const createEventService = async (event: eventCreateRequest): Promise<event> => {
    //.get() returns a snapshot of the whole firestore collection. It's just a view of the collection.
    const eventSnapshot = await db.collection("events").get();
    //docs gets an array of the collection.
    const documentCount = eventSnapshot.docs.length + 1;
    const id: string = "evt_" + String(documentCount).padStart(5, "0");

    event = {
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
    }
    return await addDocument(event, id);

    /*
    const id: string = "evt_" + String(eventData.length + 1).padStart(5, "0");
    //current date.
    const createdAt: Date =  (new Date());
    
    const newEvent: eventResponse = {
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
    */
}