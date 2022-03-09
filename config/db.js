import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const connectionString = "mongodb://localhost:27017/todoList";
const client = new MongoClient(connectionString,function(err, database) {
    if(err) throw err;

    // Start the application after the database connection is ready
    app.listen(3000);
    console.log("Listening on port 3000 db");
});


export default client;