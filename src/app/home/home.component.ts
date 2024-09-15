import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/Employee';
import { ApiServiceService } from '../HttpService/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private Services: ApiServiceService) { }
  ngOnInit() {
   
  }


}
