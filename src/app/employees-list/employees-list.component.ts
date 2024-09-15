import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../HttpService/api-service.service';
import { Employee, EmployeeFilter, EmployeeResponseDto } from '../Models/Employee';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public EmployeeList: any[] = [];
  public FilterEmployeeList: any[] = [];
  employee = new Employee();
  oEmployeeFilter = new EmployeeFilter();
  oEmployeeResponseDto = new EmployeeResponseDto();
  pagesArray: number[] = [];
  filterDateOfBirth: string = "";
  id: number = -1;
  Image: any;
  SearchForEmail: string = "";
  SearchForMobile: string = "";
  SearchForDateOfBirth: string = "";
  SearchForName: string = "";
  constructor(private Services: ApiServiceService, private datepipe:DatePipe, private router: Router) { }
  ngOnInit() {
    this.getrequest();
  }


  filter() {
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
    debugger
    this.filterDateOfBirth
    this.oEmployeeFilter.dateOfBirth = this.datepipe.transform(this.filterDateOfBirth, 'yyyy-MM-dd') ?? '';
    this.Services.GetEmployee(this.oEmployeeFilter).subscribe(
      (response: any) => {
        debugger
        this.EmployeeList = response.items;
        this.FilterEmployeeList = response.items;
        this.oEmployeeResponseDto = response;
        this.pagesArray = Array.from({ length: response.totalPages }, (v, k) => k + 1); 
        console.log(response);
      }
    )
  }

  public InterFaceSearch() {
    debugger
    this.FilterEmployeeList = this.EmployeeList;
    if (this.SearchForName != "") {
      this.FilterEmployeeList = this.FilterEmployeeList.filter(c => (c.firstName + " " + c.lastName).toLowerCase().indexOf(this.SearchForName.toLowerCase()) > -1)
    }
    if (this.SearchForEmail != "") {
      this.FilterEmployeeList = this.FilterEmployeeList.filter(c => c.email.toLowerCase().indexOf(this.SearchForEmail.toLowerCase()) > -1)
    }
    if (this.SearchForMobile != "") {
      this.FilterEmployeeList = this.FilterEmployeeList.filter(c => c.mobile.toLowerCase().indexOf(this.SearchForMobile.toLowerCase()) > -1)
    }

  }

  // Handle page change
  onPageChange(pageNo: number): void {
    if (pageNo >= 1 && pageNo <= this.oEmployeeResponseDto.totalPages) {
      this.oEmployeeFilter.pageNo = pageNo;
      this.getrequest();
    }
  }
}