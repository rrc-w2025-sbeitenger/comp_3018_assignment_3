import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    //Added test cases.

    it("should pass for all valid body inputs", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            status: Joi.string().valid("active", "cancelled", "completed").optional(),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional(),
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };
    mockReq.body = { name: "counter-strike", capacity: 150, status: "active", category: "workshop", registrationCount: 50, date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockNext).toHaveBeenCalled();
    //expect(mockRes.status).not.toHaveBeenCalled();
    //expect(mockRes.json).not.toHaveBeenCalled();
    });

     it("should pass for only required valid inputs", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };
    mockReq.body = { name: "counter-strike", capacity: 150, date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockNext).toHaveBeenCalled();
    });

    it("should fail for having under three characters in the name", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };
    mockReq.body = { name: "CS", capacity: 150, date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for status not being in the valid list", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            status: Joi.string().valid("active", "cancelled", "completed").optional(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: 150, status: "yee haww", date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for capacity being under the min of 5", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: 3, date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for capacity is a string", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: "joeeeeyy", date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for category not being in the valid list", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: 150, category: "no-meetup", date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for registrationCount being over the capacity amount", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: 150, registrationCount: 240, date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });

    it("should fail for registrationCount not being a integer", () => {
    //Arrange
    const testSchemas = {
        body: Joi.object({
            name: Joi.string().min(3).trim().required(),
            capacity: Joi.number().integer().min(5).required(),
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional(),
            date: Joi.date().greater('now').iso().required(),
        }),
    };

    mockReq.body = { name: "counter-strike", capacity: 150, registrationCount: "Joee", date: "2026-12-25T09:00:00.000Z"};
    const middleware = validateRequest(testSchemas);

    //Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
    });
});