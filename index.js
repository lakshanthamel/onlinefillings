import express from "express";
import tasksRouter from "./routers/taskRoutes.js";
import projectsRouter from "./routers/projectRoutes.js";


const app = express();

app.use(express.json());
app.use('/task', tasksRouter);
app.use('/project', projectsRouter);

app.listen(3000, console.log("Listening on port 3000"));