import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import { HealthCheckResponse, getHealthStatusService } from "../services/itemServices";
import { successResponse } from "../models/responseModel";

export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
}