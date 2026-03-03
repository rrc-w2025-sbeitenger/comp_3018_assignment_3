import { HTTP_STATUS } from "../../../constants/httpConstant";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
import { db } from "../../../../config/firebaseConfig";
//import { Event } from "../models/eventModel";
import { QuerySnapshot } from "firebase-admin/firestore";
import { EventResponse } from "../models/eventResponse";
import { EventDTO } from "../models/eventDTO";
import {
     addDocument,
      getCollection,
       getDocumentById,
        updateDocument,
         deleteDocument
     } from "../repositories/eventRepository";

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

//! change promise from Event to EventDTO.
export const createEventService = async (event: eventCreateRequest): Promise<EventDTO> => {
    // `get()` returns a QuerySnapshot containing all documents in the collection.
    const eventSnapshot: QuerySnapshot = await db.collection("events").get();
    //docs gets an array of the collection.
    const documentCount = eventSnapshot.docs.length + 1;
    const id: string = "evt_" + String(documentCount).padStart(5, "0");

    /*
    event = {
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
    }
    */
    return await addDocument(event, id);
}

//! check if it must be EventResponse or Event!!! 1:17

export const getAllEventService = async (): Promise<EventResponse[]> => {
    return await getCollection();
}

export const getEventByIdService = async (id:string): Promise<EventResponse | undefined> => {
    const entity = await getDocumentById(id);

    //if getDocumentById in repository fails validaiton then return undefined.
    if(!entity){
        return undefined;
    }

    return {
        id: id,
        name: entity.name,
        date: entity.date,
        capacity: entity.capacity,
        registrationCount: entity.registrationCount,
        status: entity.status,
        category: entity.category,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
    }
}

export const updateEventByIdService = async(id:string, event: eventCreateRequest): Promise<void | undefined> => {
    await updateDocument(id, event);
    return;
}

export const deleteEventService = async(id:string): Promise<void> => {
    await deleteDocument(id);
}