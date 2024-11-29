import * as mongodb from "mongodb";
import {Employee} from "./employee"; //import Employee interface from employee file

//export collections which could have employees, denoted by ?
export const collections: {
    employees?: mongodb.Collection<Employee>; //these employees are of type Employee
} = {};