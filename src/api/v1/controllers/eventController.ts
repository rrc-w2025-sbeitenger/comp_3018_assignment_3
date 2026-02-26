import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import { 
    HealthCheckResponse,
     getHealthStatusService,
      createEventService,
    } from "../services/eventServices";
import { successResponse } from "../models/responseModel";

export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
}

export const createEvent = (req: Request, res:Response): void => {
    const name: string = req.body.name;
    //gets checked for ISO date in middleware.
    const date: string = req.body.date;
    const capacity: number = Number(req.body.capacity);
    const registrationCount: number = Number(req.body.registrationCount);
    const status: string = req.body.status;
    const category: string = req.body.category;

    const newEvent = createEventService(name, date, capacity, registrationCount, status, category);
    res.status(HTTP_STATUS.OK).json(successResponse("Event Created", newEvent));
}