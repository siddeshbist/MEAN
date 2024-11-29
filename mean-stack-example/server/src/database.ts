import * as mongodb from "mongodb";
import {Employee} from "./employee"; //import Employee interface from employee file

//export collections which could have employees, denoted by ?
export const collections: {
    employees?: mongodb.Collection<Employee>; //these employees are of type Employee
} = {};

export async function connectToDatabase(uri:string){
    const client = new mongodb.MongoClient(uri);
    await client.connect(); //connect to Cluster

    const db = client.db("meanStackExample"); //collect database titled meanStackExample from cluster
    //if database not there, it will be created
    await applySchemaValidation(db);//ensure all documents follow Employee interface, GOOD PRACTICE

    const employeesCollection = db.collection<Employee>("employees");//creating employee collection on our database called employees
    collections.employees = employeesCollection; //add collection to collections which is being exported
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };
}

