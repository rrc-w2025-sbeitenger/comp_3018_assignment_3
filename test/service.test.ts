import { Event } from "../src/api/v1/models/eventModel";
import {
     getDocumentById,
       getCollection,
        updateDocument,
         deleteDocument
         } from "../src/api/v1/repositories/eventRepository";
import {
     getEventByIdService,
       getAllEventService,
        updateEventByIdService,
         deleteEventService
         } from "../src/api/v1/services/eventServices";

jest.mock("../src/api/v1/repositories/eventRepository", () => ({
    getDocumentById: jest.fn(),
    addDocument: jest.fn(),
    getCollection: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

const mockGetDocumentById = jest.mocked(getDocumentById);
const mockGetCollection = jest.mocked(getCollection);
const mockUpdateDocument = jest.mocked(updateDocument);
const mockDeleteDocument = jest.mocked(deleteDocument);

const mockEntity: Event = {
    id: "evt_00001",
    name: "Test Event",
    date: "2026-01-01T00:00:00.000Z",
    capacity: 100,
    registrationCount: 0,
    status: "active",
    category: "conference",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
}

const mockCreateRequest = {
    name: "Test Event",
    date: "2026-01-01T00:00:00.000Z",
    capacity: 100,
    registrationCount: 0,
    status: "active",
    category: "conference",
};

describe("getEventByIdService", () => {
    it("should return EventResponse when entity is found", async () => {
        //arrange
        mockGetDocumentById.mockResolvedValue(mockEntity);

        //act
        const result = await getEventByIdService("evt_00001");

        //assert
        expect(result).toEqual(mockEntity);
        expect(mockGetDocumentById).toHaveBeenCalledWith("evt_00001");
    });

    it("should return undefined when entity is not found", async () => {
        //arrange
        mockGetDocumentById.mockResolvedValue(undefined);

        //act
        const result = await getEventByIdService("evt_1117");
        
        //assert
        expect(result).toBeUndefined();
        expect(mockGetDocumentById).toHaveBeenCalledWith("evt_1117");
    });
});

describe("getAllEventService", () => {
    it("should return all events", async () => {
        //arrange
        const mockEvents = [
            mockEntity,
            mockEntity,
            mockEntity
        ]

        mockGetCollection.mockResolvedValue(mockEvents);

        //act
        const result = await getAllEventService();

        //assert
        expect(result).toEqual(mockEvents);
    });
});

describe("updateEventByIdService", () => {
    it("should return updated event", async () => {
        //arrange
        const updatedEvnet = {
            id: "evt_00001",
            name: "Test Event",
            date: "2026-12-01T00:00:00.000Z",
            capacity: 200,
            registrationCount: 0,
            status: "active",
            category: "workshop",
            createdAt: "2026-12-01T00:00:00.000Z",
            updatedAt: "2026-12-01T00:00:00.000Z",
        };
        mockUpdateDocument.mockResolvedValue(updatedEvnet);

        //act
        const result = await updateEventByIdService("evt_0001", mockCreateRequest);

        //assert
        expect(result).toEqual(updatedEvnet);
    });
});

describe("deleteEventService", () => {
    it("should call deleteDocument with correct id", async () => {
        //act
        await deleteEventService("evt_0001");

        //assert
        expect(mockDeleteDocument).toHaveBeenCalledWith("evt_0001");
    });
});



