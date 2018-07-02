import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Employee } from '../model/Employee';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  fetchEmployees(): Promise<any>{
    return this.http.get('http://localhost:8082/05springmvc/api/employees').toPromise()
    .then(res=>res.json())
  }
  fetchEmployee(id: number): Promise<any>{
    return this.http.get('http://localhost:8082/05springmvc/api/employee/'+id).toPromise()
    .then(res=>res.json())
  }
  updateEmployee(employee:Employee){
    return this.http.put('http://localhost:8082/05springmvc/api/employee', employee).toPromise()
  }

  addEmployee(employee:Employee): Promise<any>{
    return this.http.post('http://localhost:8082/05springmvc/api/employee', employee).toPromise()
  }

  deleteEmployee(index:number): Promise<any>{
    return this.http.delete('http://localhost:8082/05springmvc/api/employee/'+index).toPromise()
  }
}
