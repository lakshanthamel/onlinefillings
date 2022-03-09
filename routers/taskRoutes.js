import express from "express";
import taskController from "../controllers/taskController.js";
import validator from "../helpers/validator.js";

const tasksRouter = express.Router();

// task routers
tasksRouter
    .get("/all",taskController.taskList )
    .post("/",
        validator.taskValidations(false),
        taskController.taskCreate 
    ).patch("/",
        validator.taskValidations(),
        taskController.taskEdit
    ).delete("/",
        validator.validationIdOnly(),
        taskController.taskDelete
    ).patch("/change-status",
        validator.validationIdOnly(),
        taskController.taskChangeStatus
    ).post("/filter-by-status",
        validator.taskValidationStatusOnly(),
        taskController.taskFilterByStatus
    ).post("/search-by-name",
        validator.validationNameOnly(),
        taskController.taskSearchByName
    ).post("/sort-by-dates",
        validator.validationDatesOnly(),
        taskController.taskSortByDates
    );


export default tasksRouter;