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
