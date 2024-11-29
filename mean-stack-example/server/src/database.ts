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