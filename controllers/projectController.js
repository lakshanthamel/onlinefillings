import client from "../config/db.js";
import { ObjectId } from "mongodb";

export default {

    // list all projects
    async projectList(req,res) {

        try{
            await client.connect();
            const result = await client.db().collection('projects').find({}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // create project
    async projectCreate(req,res) {
        try{
            await client.connect();
            const result = await client.db().collection('projects').insertOne({
                "name": req.body.name,
                "start_date": req.body.start_date,
                "due_date": req.body.due_date
            });
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // edit project
    async projectEdit(req,res) {
        try{
            await client.connect();

            const project = await client.db().collection('projects').findOne({_id: ObjectId(req.body.id)});
            let result;

            if(project){
                result = await client.db().collection('projects').updateOne({
                    _id: ObjectId(req.body.id)
                },{
                    $set: {
                        "name": req.body.name?req.body.name:project.name,
                        "status": req.body.status?req.body.status:project.status,
                        "start_date": req.body.start_date?req.body.start_date:project.start_date,
                    }
                });
            }else{
                result = {
                    "errors" :{
                        "msg": "There is no project"
                    }
                }
            }
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // delete project
    async projectDelete(req,res) {
        try{
            await client.connect();
            const project = await client.db().collection('projects').findOne({_id: ObjectId(req.body.id)});
            let result;
            if(project){
                result = await client.db().collection('projects').deleteOne({
                    _id: ObjectId(req.body.id)
                });
            }else{
                result = {
                    "errors" :{
                        "msg": "There is no project"
                    }
                }
            }
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // assign a task to a project
    async projectAssignTask(req,res) {
        try{
            await client.connect();
            let result;
            const project = await client.db().collection('projects').findOne({_id: ObjectId(req.body.projectId)});
            const task = await client.db().collection('tasks').findOne({_id: ObjectId(req.body.taskId)});

            // check task and project exists
            if(task && project){
                // get current project that assigned the task
                const projectTask = await client.db().collection('projects').findOne({tasks: ObjectId(req.body.taskId)});

                // check whether task is already assign to the same project
                if(project.tasks && project.tasks.find(element => element == req.body.taskId)){
                    result = {
                        "errors" :{
                            "msg": "Task is already assign to the same project"
                        }
                    }
                } else{

                    // remove task from current project
                    if(projectTask){
                        const deleteOther = await client.db().collection('projects').updateOne({
                            _id: projectTask._id
                        },{
                            $pull: {
                                "tasks": ObjectId(req.body.taskId),
                            }
                        });
                    }
    
                    // assign task to the new project
                    result = await client.db().collection('projects').updateOne({
                        _id: ObjectId(req.body.projectId)
                    },{
                        $push: {
                            "tasks": ObjectId(req.body.taskId),
                        }
                    });
                }
            }else{
                result = {
                    "errors" :{
                        "msg": "Task/project not available."
                    }
                }
            }


            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // get project list by searching name
    async projectSearchByName(req,res) {
        try{
            await client.connect();
            const search = req.body.name.trim();
            const result = await client.db().collection('projects').find({name: new RegExp(search,'i')}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },


    // get project list sorting by dates
    async projectSortByDates(req,res) {

        try{
            await client.connect();
            const order = req.body.order.trim();
            const orderBy = req.body.orderBy.trim();
            const result = await client.db().collection('projects').find({}).sort({[orderBy]:(order=='asc'?1:-1)}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    }
} 