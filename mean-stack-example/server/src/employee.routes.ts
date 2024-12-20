import * as express from "express";
import {ObjectId} from "mongodb";
import {collections} from "./database";

//express router
export const employeeRouter = express.Router();
employeeRouter.use(express.json());

//get route
employeeRouter.get("/",async(req,res)=>{
    try{
        const employees = await collections?.employees?.find({}).toArray();
        res.status(200).send(employees)
    }catch(error){
        res.status(500).send(error instanceof Error? error.message:"Unknown errror");
    }
})

employeeRouter.get("/:id",async(req,res)=>{
    try{
        const id = req?.params?.id;//wtf is ?. and wtf is req.params
        const query = {_id: new ObjectId(id)};//wtf is ObjectID again 
        const employee = await collections.employees?.findOne(query);

        if (employee){
            res.status(200).send(employee);
        }else{
            res.status(404).send(`Failed to find employee with id ${id}`);
        }
        
    }catch(error){
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }
})
//Just an example of route parameters
// employeeRouter.get('/users/:name',(req,res)=>{
//     const name = req.params.name;
//     res.send(`The ID being requested is ${name}`);
// })

//READ THESE COMMENTS FUTURE SID
// HTML Status Code 404 is a client side error 
//HTML Status Code 500 is a server side error
//req(uest) object contains a params attribute 
//:name is a route parameter which can be extracted and stored
//MongoDB automatically generates an _id field for every document in a collection
//new ObjectId(id) ensures id string entered in URL is converted into an ObjectId type, which is required when querying MongoDBs _id field

employeeRouter.post("/",async(req,res)=>{
    try{
        const employee = req.body;
        const result = await collections?.employees?.insertOne(employee);

        if (result?.acknowledged){
            res.status(201).send(`Created a new employee: ID ${result.insertedId}`); //back tics for string interpolation
        }else{
            res.status(500).send("Failed to created new employee.") //double quotes as all string
        }

    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message:"Unknown error");
    }
})

//HTTP status code 201 means the server has successfully processed the request and as a result a new resources has been created
//HTTP status cdoe 400 means the server cannot process the request because of a client side error such as malformed syntax, invalid data or missing parameters

employeeRouter.put("/:id",async(req,res)=>{
    try{
        const id = req?.params?.id;
        const employee = req.body;
        const query = {_id:new ObjectId(id)};
        const result = await collections?.employees?.updateOne(query,{$set:employee});

        if (result && result.matchedCount){
            res.status(200).send(`Updated an employee: ID ${id}`);
        } else if (!result?.matchedCount){
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        } else{
            res.status(304).send(`Failed to update an employee: ID ${id}`);
        }
    }catch(error){
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

employeeRouter.delete("/:id",async(req,res)=>{
    try{
        const id = req?.params?.id;
        const query = {_id: new ObjectId(id)};
        const result = await collections?.employees?.deleteOne(query);

        if(result && result.deletedCount){
            res.status(202).send(`Removed an employee: ID${id}`);
        }else if(!result){
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        }else if (!result.deletedCount){
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    }catch(error){
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
})