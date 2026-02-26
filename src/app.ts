import express, {Express} from "express";
import eventRoutes from "./api/v1/routes/eventRoutes";
//import morgan from "morgan";

//Initialize Express application.
const app: Express = express();

//global middleware.
app.use(express.json());
//app.use((morgan("combined")));

//router handler for tickets.
app.use("/api/v1", eventRoutes);

export default app;