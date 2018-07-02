import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EmployeeService } from '../../services/employee.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  myForm: FormGroup
  message:string = ''
  alertClass: string = "alert alert-success"

  genders: Array<string> = ['Male', 'Female']

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      if(params.id){
        this.fetchEmployee(params.id) 
      }
    });
  }

  fetchEmployee(id: number){
    this.employeeService.fetchEmployee(id)
    .then(data => {
      console.log(data);
      this.myForm.controls['id'].setValue(data.id)
      this.myForm.controls['name'].setValue( data.name);
      this.myForm.controls['salary'].setValue( data.salary);
    })
  }


  ngOnInit() {

      this.myForm = new FormGroup({  
              'id': new FormControl('' ),   
              'name': new FormControl('', [Validators.required] ),
              'salary': new FormControl('', Validators.required)
          // 'password': new FormControl('', Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,16}$")),
          // 'age': new FormControl('', [Validators.min(18), Validators.max(100)]),
          // 'gender': new FormControl('Male')
      })

      this.myForm.statusChanges.subscribe((data: any) => console.log(data));

  }

  onSubmit() {
      console.log(this.myForm);
      console.log(this.myForm.value);
      this.employeeService.addEmployee(this.myForm.value)
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          this.alertClass = "alert alert-success"
          this.message = "Employee added successfully!!"
        }
      })
      .catch((res) =>{
        console.log(res.status)
        if(res.status == 409){
          this.alertClass = "alert alert-danger"
          this.message = "Employee already exists!!"
        }
      })
  }
  updateEmployee() {
      console.log(this.myForm);
      console.log(this.myForm.value);
      this.employeeService.updateEmployee(this.myForm.value)
      .then((data) => console.log(data))
      
  }


  // uniqueUserValidator(control: FormControl): Promise<any> {
  //     // Server to make a request, AJAX -> can take time

  //     const promise = new Promise<{ [s: string]: boolean }>(
  //         (resolve, reject) => {

  //             if (control.value && control.value!='') {

  //                 setTimeout(() => {
  //                     console.log('Validation is fired now!!')
  //                     this.http.get('http://localhost:7000/userexists/' + control.value)
  //                         .toPromise().then((res) => res.json())
  //                         .then((data) => {
  //                             console.log(data)
  //                             if (data.exists === true) {
  //                                 resolve({ "invalid": true })
  //                             }
  //                             else {
  //                                 resolve(null)
  //                             }
  //                         }
  //                         )
  //                 }
  //                     , 1000)
  //             }
  //             else{
  //                 resolve(null)
  //             }
  //         })
  //     return promise;


  // }


}
