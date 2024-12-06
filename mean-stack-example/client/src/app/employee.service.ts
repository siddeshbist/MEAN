import { Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200'; //server running here
  //2 signals which are used to handle reactive states
  //Signals provide a clean and efficient way to manage state in Angular,
  //automatically triggering updates in the UI when the state changes
  
  //Creates a signal named employees$ that holds an array of Employee objects
  //The type <Employee[]> indicates this signal will store an array of employees
  //Initially the signal is set to an empty array ([])
  //Purpose is to track and manage a list of employees reactively. Changes to the list will automatically trigger updates wherever signal is being used
  employees$ = signal<Employee[]>([]);
  
  //This creates a signal named employee$ that holds a single Employee object
  //The type <Employee> indicates that this signal will store a single Employee
  //Initially, it is set to an empty object cast as Employee using '{} as Employee' even if 
  //it doesn't yet conform to the Employee type structure
  //Typically used to track and manage a single employees data reactively such as the 
  //currently selected employee
  employee$ = signal<Employee>({} as Employee); 

//1.Reactive State Management
//These signals can be updated(set,update) and read in a reactive way. Whenever the state of employees$ or employee$ changes
//the angular components or templates using them will automatically update

//constructor(dependency:DependencyType)
  constructor(private httpClient: HttpClient) { }

  //private method so only accessed within same class
  //fetch latest list of employees from an API and update a reactive signal (employees$) with the new data
  //The <Employee[]> specifies endpoint will return back array containing employee objects
  //.subscribe subscribes to the observable returned by httpClient.get to handle the response when the data arrives
  //the employees parameter in the callback function holds the array of Employee objects
  //the set method of the signal replaces the current value with the new data(employees)
  
  private refreshEmployees(){
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
    .subscribe(employees => {
      this.employees$.set(employees);
    });
  }


}


