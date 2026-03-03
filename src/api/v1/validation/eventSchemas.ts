import Joi from "joi";
//{ ObjectSchema } 

// Post operation schemas organized by request part
export const eventSchemas = {
    //POST /event - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().min(3).trim().required().messages({
                "any.required": `Validation error: "name" is required.`,
                "string.min": `Validation error: "name" must be at least 3 characters long.`,
                "string.empty": `Validation error: "name" cannot be empty.`
            }),

            capacity: Joi.number().integer().min(5).required().messages({
                "any.required": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.min": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.interger": `Validation error: "capacity" must be an interger`
            }),

            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": `Validation error: "status" must be one of [active, cancelled, completed]`
            }),

            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": `Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]`,
            }),
            
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional().messages({
                "number.max": `Validation error: "registrationCount" must be less than or equal to capacity.`,
                "number.interger": `Validation error: "registrationCount" must be an interger.`,
            }),

            date: Joi.date().greater('now').iso().required().messages({
                "any.required": `Validation error: "date" must be greater than "now"`
            })
        }),
    },

    //GET /events/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": `Validation error: "Id" is required.`
            })
        })
    },

    //PUT /events/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),

        body: Joi.object({
            name: Joi.string().min(3).trim().optional().messages({
                "any.required": `Validation error: "name" is required.`,
                "string.min": `Validation error: "name" must be at least 3 characters long.`,
                "string.empty": `Validation error: "name" cannot be empty.`
            }),

            capacity: Joi.number().integer().min(5).optional().messages({
                "any.required": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.min": `Validation error: "capacity" must be greater than or equal to 5.`,
                "number.interger": `Validation error: "capacity" must be an interger`
            }),

            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": `Validation error: "status" must be one of [active, cancelled, completed]`
            }),

            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": `Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]`,
            }),
            
            registrationCount: Joi.number().integer().max(Joi.ref("capacity")).optional().messages({
                "number.max": `Validation error: "registrationCount" must be less than or equal to capacity.`,
                "number.interger": `Validation error: "registrationCount" must be an interger.`,
            }),

            date: Joi.date().iso().optional().messages({
                "any.required": `Validation error: "Date" must be of ISO date.`
            })
        }),
    },
    
    //DELETE /events/:id - Delete event
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),
    },
};