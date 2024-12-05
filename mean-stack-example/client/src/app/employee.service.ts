import { Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200'; //server running here
  constructor(private httpClient: HttpClient) { }
}
