import express from "express";
import projectController from "../controllers/projectController.js";
import validator from "../helpers/validator.js";

const projectsRouter = express.Router();

// project routers
projectsRouter.get("/all",projectController.projectList )
    .post("/",
        validator.projectValidations(false),
        projectController.projectCreate 
    ).patch("/",
        validator.projectValidations(),
        projectController.projectEdit
    ).delete("/",
        validator.validationIdOnly(),
        projectController.projectDelete
    ).patch("/assign-task",
        validator.validationIdsOnly(),
        projectController.projectAssignTask
    ).post("/search-by-name",
        validator.validationNameOnly(),
        projectController.projectSearchByName
    ).post("/sort-by-dates",
        validator.validationDatesOnly(false),
        projectController.projectSortByDates
    );


export default projectsRouter;