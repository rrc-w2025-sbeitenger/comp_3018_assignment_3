import { db } from "../../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
import { Event } from "../models/eventModel";
import { EventDTO } from "../models/eventDTO";
//import { EventResponse } from "../models/eventResponse";

export const addDocument = async (event: eventCreateRequest, id: string): Promise<Event> => {
    // Create a reference to a document in the 'users' collection with ID
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("events").doc();

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    const eventEntity: Event = {
        id: id,
        name: event.name,
        date: new Date(event.date).toISOString(),
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    await docRef.set(eventEntity);

    return eventEntity; 
    //return id if frontend needs it.
    //return docRef.id;
};

export const getCollection = async (): Promise<EventDTO[]> => {
    // Retrieve all documents from the 'events' collection
    // `get()` returns a QuerySnapshot containing all documents in the collection
    const eventSnapshot: QuerySnapshot = await db.collection("events").get();
    
    const events: EventDTO[] = [];
    
    // Iterate through each document in the collection
    eventSnapshot.forEach((doc) => {
        // `doc.id` is the document's unique identifier
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();
        events.push({
            id: data.id,
            name: data.name,
            date: data.date,
            capacity: data.capacity,
            registrationCount: data.registrationCount,
            status: data.status,
            category: data.category,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });

    });

    return events;
};

export const getDocumentById = async (id: string): Promise<Event | undefined> => {
    // Create a reference to a specific document in the 'users' collection
    const docRef: DocumentReference = db.collection("events").doc(id);

    // Use the `get()` method to retrieve the document
    const doc = await docRef.get();

    // Check if the document exists
    if (doc.exists) {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();
        return {
            id: data!.id,
            name: data!.name,
            date: data!.date,
            capacity: data!.capacity,
            registrationCount: data!.registrationCount,
            status: data!.status,
            category: data!.category,
            createdAt: data!.createdAt,
            updatedAt: data!.updatedAt,
        }
    } else {
        //return undefined for validation in service module - getEventByIdService.
        return undefined;
    }
};