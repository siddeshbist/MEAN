import { Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200'; //server running here
  constructor(private httpClient: HttpClient) { }

  private refreshEmployees(){
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
  }
}

//this.httpClient.get
//method from Angular HttpClient service, which is used to make HTTP GET requests
//fetches data from a server using provided URL

//<Employee[]>
//This is a TypeScript generic type that specifies the expected shape of the response
//tells the compiler that the response will be an array of objects matching the Employee interface or class

//the method send a GET request to URL and retreives array of objects that are type Employee from the server
