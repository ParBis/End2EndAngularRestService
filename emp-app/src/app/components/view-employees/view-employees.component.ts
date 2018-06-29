import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  employees: Array<Employee> = []

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.fetchEmployees()
    .then((data)=>{
      console.log(data);
      this.employees = data;
    })
  }

}
