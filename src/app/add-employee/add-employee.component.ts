import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../Models/Employee';
import { ApiServiceService } from '../HttpService/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee = new Employee();
  id: number = 0;
  image: any;
  dateOfBirth: any = "";
  constructor(private Services: ApiServiceService, private activatedRoute: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.id = Number(param['id']);
    });
    if (this.id > 0) {
      this.GetEmployeeById(this.id);
    } else {
      debugger
      this.employee.firstName = "";
      this.employee = new Employee();
      const myDate = new Date();
      this.dateOfBirth =this.datepipe.transform(myDate, 'yyyy-MM-dd');
    }

  }
  GetEmployeeById(id: number) {
    this.Services.GetEmployeeById(id).subscribe(
      (response: any) => {
        this.employee = response;

        this.dateOfBirth =  this.datepipe.transform(response.dateOfBirth, 'yyyy-MM-dd');
      }, (err: any) => {
        console.log(err)
      }
    )
  }
  ImageUploadMethod(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }
  AddEmployee() {
    const formData = new FormData();
    this.employee.dateOfBirth = this.dateOfBirth;
    formData.append('file', this.image);
    formData.append('object', JSON.stringify(this.employee));
    this.Services.PostEmployee(formData).subscribe(
      (res) => {
      }, (err) => {
        alert("Plase Enter vaild box")
        console.log(err);
      }
    )
  }

  UpdateEmployee() {
    const formData = new FormData();
    this.employee.dateOfBirth = this.dateOfBirth;
    formData.append('file', this.image);
    formData.append('object', JSON.stringify(this.employee));
    this.Services.PutEmployee(formData).subscribe(
      (res) => {

      }
    )
  }






}
