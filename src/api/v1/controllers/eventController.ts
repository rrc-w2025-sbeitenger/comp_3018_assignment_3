import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import { successResponse } from "../models/responseModel";
import { eventCreateRequest } from "../models/eventCreateRequestModel";
import { EventDTO } from "../models/eventDTO";
import { 
    HealthCheckResponse,
     getHealthStatusService,
      createEventService,
       getAllEventService,
        getEventByIdService,
         updateEventByIdService
    } from "../services/eventServices";

export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
}

export const createEvent = async (req: Request, res:Response) => {
    try{
        const requestEvent: eventCreateRequest = {
            name: req.body.name,
            //gets checked for ISO date in middleware.
            date: req.body.date,
            capacity: Number(req.body.capacity),
            registrationCount: Number(req.body.registrationCount),
            status: req.body.status,
            category: req.body.category
        }
        
        const newEventResult = await createEventService(requestEvent);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newEventResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

export const getAllEvents = async (req: Request, res:Response) => {
    try {
        const getAllEventsResult: EventDTO[] = await getAllEventService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllEventsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getEventById = async (req: Request, res:Response) => {
    try{
        const id: string = String(req.params.id);
        const getEventResult = await getEventByIdService(id);

        if(!getEventResult){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid "Id" is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(getEventResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const updateEvent = async (req: Request, res:Response) => {
    try{
        const id: string = String(req.params.id);
        const eventRequest: eventCreateRequest = {
            name: req.body.name,
            date: req.body.date,
            capacity: req.body.capacity,
            registrationCount: req.body.registrationCount,
            status: req.body.status,
            category: req.body.category,
        }

        const updatedEvent = await updateEventByIdService(id, eventRequest);

        if(!updatedEvent){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid "Id" is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(`Entity ${id} was updated`));
        
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}