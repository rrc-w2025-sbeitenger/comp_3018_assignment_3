import { HTTP_STATUS } from "../../../constants/httpConstant";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
//import { eventResponse } from "../models/eventResponse";
import { addDocument, getCollection } from "../repositories/eventRepository";
import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";
import { QuerySnapshot } from "firebase-admin/firestore";
import { EventDTO } from "../models/eventDTO";

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

export const createEventService = async (event: eventCreateRequest): Promise<Event> => {
    //.get() returns a snapshot of the whole firestore collection. It's just a view of the collection.
    const eventSnapshot: QuerySnapshot = await db.collection("events").get();
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
}

//change 'any' later to what it should be.
export const getAllEventService = async (): Promise<EventDTO[]> => {
    return await getCollection();
}