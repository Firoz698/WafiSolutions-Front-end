import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../HttpService/api-service.service';
import { Employee, EmployeeFilter, EmployeeResponseDto } from '../Models/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public EmployeeList: any[] = [];
  employee = new Employee();
  oEmployeeFilter = new EmployeeFilter();
  oEmployeeResponseDto = new EmployeeResponseDto();
  pagesArray: number[] = [];
  id: number = -1;
  Image: any;
  SearchForEmail: string = "";
  SearchForMobile: string = "";
  SearchForDateOfBirth: string = "";
  SearchForName: string = "";
  constructor(private Services: ApiServiceService, private router: Router) { }
  ngOnInit() {
    this.getrequest();
  }

  EditEmployee(Item: any) {
    this.router.navigate(['addEmployee/' + Item.id]);
  }
  DeletedEmployee(object: any) {
    this.id = object.id;
    document.getElementById('ConframDeletedModal')?.click();
  }

  deleteConfirm() {
    if (this.id > 0) {
      this.Services.DeletedEmployee(this.id).subscribe(
        (res) => {
          this.getrequest();
          document.getElementById('DeletedClose')?.click();
        }
      )
    }
  }

  UpdateProduct() {
    const formData = new FormData();
    formData.append('file', this.Image);
    formData.append('object', JSON.stringify(this.employee));
    this.Services.PutEmployee(formData).subscribe(
      (res) => {
        this.getrequest();
      }
    )
    document.getElementById('ModalClose')?.click();
  }
  getrequest() {
    this.Services.GetEmployee(this.oEmployeeFilter).subscribe(
      (response: any) => {
        this.EmployeeList = response.items;
        this.oEmployeeResponseDto = response;
        this.pagesArray = Array.from({ length: response.totalPages }, (v, k) => k + 1); // Array of pages
        console.log(response);
      }
    )
  }

  // Handle page change
  onPageChange(pageNo: number): void {
    if (pageNo >= 1 && pageNo <= this.oEmployeeResponseDto.totalPages) {
      this.oEmployeeFilter.pageNo = pageNo;
      this.getrequest();
    }
  }
}