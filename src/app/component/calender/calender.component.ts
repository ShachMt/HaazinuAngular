// import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  picker:any;
  @Output() actionCompleted = new EventEmitter<string>();

  constructor() { }
  selectedDate:Date=new Date();
  ngOnInit(): void {
  }

}
