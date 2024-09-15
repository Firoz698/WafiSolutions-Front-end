import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeFilter } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private http: HttpClient) { }

  config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  GetEmployee(oEmployeeFilter:EmployeeFilter): Observable<any> {
    return this.http.post<any>("https://localhost:7237/api/Employee/GetAllEmployee", oEmployeeFilter,this.config)
  }
  PostEmployee(FormDat: any): Observable<any> {
    debugger
    return this.http.post("https://localhost:7237/api/Employee/AddEmployee", FormDat);
  }
  PutEmployee(FormDat: any): Observable<any> {
    return this.http.post<any>("https://localhost:7237/api/Employee/UpdateEmployee", FormDat);
  }
  DeletedEmployee(id: any): Observable<any> {
    debugger
    return this.http.delete<any>("https://localhost:7237/api/Employee/DeletedEmployee?Id=" + id, this.config)
  }

  GetEmployeeById(id: number): Observable<any>{
    return this.http.get("https://localhost:7237/api/Employee/GetEmployeeById?Id=" + id ,this.config)
  }




}
