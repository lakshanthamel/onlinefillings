import client from "../config/db.js";
import { ObjectId } from "mongodb";

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {

    // get task list 
    async taskList(req,res) {

        try{
            await client.connect();
            const result = await client.db().collection('tasks').find({}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // create a task
    async taskCreate(req,res) {
        try{
            await client.connect();
            const result = await client.db().collection('tasks').insertOne({
                "name": req.body.name,
                "status": req.body.status,
                "start_date": req.body.start_date,
                "due_date": req.body.due_date,
                "done_date": req.body.done_date
            });
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // edit a task
    async taskEdit(req,res) {
        try{
            await client.connect();
            const task = await client.db().collection('tasks').findOne({_id: ObjectId(req.body.id)});
            let result;

            if(task){
                result = await client.db().collection('tasks').updateOne({
                    _id: ObjectId(req.body.id)
                },{
                    $set: {
                        "name": req.body.name?req.body.name:task.name,
                        "status": req.body.status?req.body.status:task.status,
                        "start_date": req.body.start_date?req.body.start_date:task.start_date,
                        "due_date": req.body.due_date?req.body.due_date:task.due_date,
                        "done_date": req.body.done_date?req.body.done_date:task.done_date 
                    }
                });
            }else{
                result = {
                    "errors" :{
                        "msg": "There is no task"
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

    // delete a task
    async taskDelete(req,res) {
        try{
            await client.connect();
            const task = await client.db().collection('tasks').findOne({_id: ObjectId(req.body.id)});
            let result;
            if(task){
                result = await client.db().collection('tasks').deleteOne({
                    _id: ObjectId(req.body.id)
                });
            }else{
                result = {
                    "errors" :{
                        "msg": "There is no task"
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

    // change status of the task
    async taskChangeStatus(req,res) {
        try{
            await client.connect();
            const task = await client.db().collection('tasks').findOne({_id: ObjectId(req.body.id)});
            const result = await client.db().collection('tasks').updateOne({
                _id: ObjectId(req.body.id)
            },{
                $set: {
                    "status": (task.status == 0?1:0),
                    "start_date": (task.status == 1?"":task.start_date),
                    "due_date": (task.status == 1?"":task.due_date),
                    "done_date": (task.status == 1?"":task.done_date),
                }
            });
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // get task list by filtering by status
    async taskFilterByStatus(req,res) {
        try{
            await client.connect();
            const result = await client.db().collection('tasks').find({"status" : req.body.status}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // get task list searching by name
    async taskSearchByName(req,res) {
        try{
            await client.connect();
            const search = req.body.name.trim();
            const result = await client.db().collection('tasks').find({name: new RegExp(search,'i')}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    },

    // get task list sorting by dates
    async taskSortByDates(req,res) {

        try{
            await client.connect();
            const order = req.body.order.trim();
            const orderBy = req.body.orderBy.trim();
            const result = await client.db().collection('tasks').find({}).sort({[orderBy]:(order=='asc'?1:-1)}).toArray()
            
            res.send(result);
        }catch(e){
            res.send("Error : " + e);
        }finally{
            client.close();
        }
        
    }
} 