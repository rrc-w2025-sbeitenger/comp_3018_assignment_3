import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";

//inject new routes 
const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;