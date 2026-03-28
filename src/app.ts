import express, {Express} from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import setupSwagger from "../config/swagger";
import eventRoutes from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

//Initialize Express application.
const app: Express = express();

//configuration for JSON APIs
const apiHelmetConfig = helmet({
    // Disable unnecessary middleware for API-only apps
    contentSecurityPolicy: false, // Not needed for JSON APIs
    crossOriginEmbedderPolicy: false,

    // Keep essential security headers
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },

    //sets "X-Permitted-Cross-Domain-Policies: none".
    //tells client the domain policy for loading cross-domian content.
    //protects from strange adobe requests.
    xPermittedCrossDomainPolicies: {
        permittedPolicies: "none",
    },

    // Remove server information from responses
    hidePoweredBy: true,

    // Prevent MIME type sniffing
    noSniff: true,

    // Prevent clickjacking
    xFrameOptions: {action: "deny"},
});

//helmet.js
app.use(apiHelmetConfig);

// config/corsConfig.ts
const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
            optionsSuccessStatus: 204,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 204,
        maxAge: 1200,
    };
};

//cors
app.use(cors(getCorsOptions()));

//global middleware.
app.use(express.json());
app.use((morgan("combined")));

//router handler for tickets.
app.use("/api/v1", eventRoutes);

// Setup Swagger
setupSwagger(app);

export default app;