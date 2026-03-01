import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
import {event} from "../models/eventModel";
//import { EventDTO } from "../models/eventDTO";

export const addDocument = async (event: eventCreateRequest, id: string): Promise<event> => {
    // Create a reference to a document in the 'users' collection with ID 'user1'
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("events").doc();

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    const eventEntity: event = {
        id: id,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await docRef.set(eventEntity);

    return eventEntity;
    //return id if frontend needs it.
    //return docRef.id;
};