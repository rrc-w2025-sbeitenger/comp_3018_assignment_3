import express, {Express} from "express";
import itemRoutes from "./api/v1/routes/itemRoutes";

//Initialize Express application.
const app: Express = express();
app.use(express.json());

//router handler for tickets.
app.use("/api/v1", itemRoutes);

export default app;