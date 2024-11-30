import * as express from "express";
import {ObjectId} from "mongodb";
import {collections} from "./database";

//express router
export const employeeRouter = express.Router();
employeeRouter.use(express.json());

//get route
employeeRouter.get("/",(req,res)=>{
    try{

    }catch(error){
        res.status(500).send(error instanceof Error? error.message:"Unknown errror");
    }
})
