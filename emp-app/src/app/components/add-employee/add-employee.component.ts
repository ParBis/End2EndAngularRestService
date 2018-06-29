import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';


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
  id: number;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }



  ngOnInit() {

      this.myForm = new FormGroup({     
              'name': new FormControl('', [Validators.required] ),
              'salary': new FormControl('', Validators.required)
          // 'password': new FormControl('', Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,16}$")),
          // 'age': new FormControl('', [Validators.min(18), Validators.max(100)]),
          // 'gender': new FormControl('Male')
      })

      this.myForm.statusChanges.subscribe((data: any) => console.log(data));


      const id = +this.route.snapshot.paramMap.get('id');
      //const name = +this.route.snapshot.paramMap.get('name');
      console.log("id---------->"+id);
      if(+id >= 0){
      //if(name != 0){
          // this.title = `Edit User`;
          this.id = +id;
          //this.name = name.toString();
          this.getEmployee(this.id);
      }
  }

  getEmployee(id) {
    console.log('index getEmployee------>'+id);
      this.employeeService.getEmployee(id)
          .then(res => {
              console.log(res);
              //this.myForm = res;
              
            //   if (res.success == true) {
            //       this.user = res.data;
            //   }
          }, err => {
              console.log('server err');
              console.log(err);
          })
          .catch(err => {
              console.log('client err');
              console.log(err);
          })
  }
  // this.employeeService.fetchEmployees()
  // .then((data)=>{
  //   console.log(data);
  //   this.employees = data;
  // })

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
