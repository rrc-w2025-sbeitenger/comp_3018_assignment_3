import express, {Express} from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import helmet, { xXssProtection } from "helmet";
import { boolean } from "node_modules/joi/lib";

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

    //sets "X-Permitted-Cross-Domain-Policies: by-content-type".
    //tells client the domain policy for loading cross-domian content.
    //protects from strange adobe requests.
    xPermittedCrossDomainPolicies: {
        permittedPolicies: "by-content-type",
    },

    // Remove server information from responses
    hidePoweredBy: true,

    // Prevent MIME type sniffing
    noSniff: true,

    // Prevent clickjacking
    frameguard: { action: "deny" },
});

app.use(apiHelmetConfig);

//global middleware.
app.use(express.json());
app.use((morgan("combined")));

//router handler for tickets.
app.use("/api/v1", eventRoutes);

export default app;