import Joi, { ObjectSchema } from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /event - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().min(3).trim().required().messages({
                "any.required": `Validation error: "name" is required.`,
                "string.min": `Validation error: "name" must be at least 3 characters long.`,
                "string.empty": `Validation error: "name" cannot be empty.`,
            }),

            capacity: Joi.number().integer().min(5).required().messages({
                "any.required": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.min": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.interger": `Validation error: "capacity" must be an interger`,
            }),

            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": `Validation error: "status" must be one of [active, cancelled, completed]`,
            }),

            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": `Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]`,
            }),
            
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional().messages({
                "any.max": `Validation error: "registrationCount" must be less than or equal to ref:capacity.`,
            }),
        }),
    },
};