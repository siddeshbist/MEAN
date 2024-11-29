import * as dotenv from "dotenv" //use dotenv package to read from .env file
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";


dotenv.config();//Load environment variables from the .env file where the ATLAS_URI is configured
const {ATLAS_URI} = process.env; //destructuring object 

//error correction
if (!ATLAS_URI){
    console.log("No ATLAS_URI env variable has been defined in config.env");
    process.exit(1);
}