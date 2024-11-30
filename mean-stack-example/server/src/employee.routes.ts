import * as express from "express";
import {ObjectId} from "mongodb";
import {collections} from "./database";

//express router
export const employeeRouter = express.Router();
employeeRouter.use(express.json());