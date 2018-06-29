import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/Employee';

@Pipe({
  name: 'filterEmployee'
})
export class FilterEmployeePipe implements PipeTransform {

  transform(employees: Array<Employee>, searchString: string): any {
    let serachedEmployees = employees.filter((employee)=> employee.name.includes(searchString))
    return serachedEmployees;
  }

}
