import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Employee } from '../model/Employee';

@Injectable()
export class EmployeeService {
  idst: string;
  constructor(private http: Http) { }

  fetchEmployees(): Promise<any>{
    return this.http.get('http://localhost:8082/05springmvc/api/employees').toPromise()
    .then(res=>res.json())
  }

  addEmployee(employee:Employee): Promise<any>{
    return this.http.post('http://localhost:8082/05springmvc/api/employee', employee).toPromise()
  }

  getEmployee(id: number): Promise<any>{
    this.idst = id.toString();
    console.log("this.idst--------->" + this.idst);
    //return this.http.get('http://localhost:8082/05springmvc/api/fetchEmployeeById', {params:{idst: this.idst}}).toPromise()
    return this.http.get('http://localhost:8082/05springmvc/api/fetchEmployeeById', this.idst).toPromise()
    //return this.http.get(`http://localhost:8082/05springmvc/api/fetchEmployeeById/${this.idst}`).toPromise()
    .then(res=>res.json())
  }
  // getEmployee(index: number): Promise<any> {
  //   return this.http.get(`http://localhost:8082/05springmvc/api/getemployee/${index}`).toPromise()
  //       .then(response => {
  //           return response.json();
  //       })
  //       .catch(err => err);
  // }

}
