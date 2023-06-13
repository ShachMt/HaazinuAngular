import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-educational-institutions',
  templateUrl: './educational-institutions.component.html',
  styleUrls: ['./educational-institutions.component.scss']
})
export class EducationalInstitutionsComponent implements OnInit {

  constructor() { }
  form!: FormGroup;

  ngOnInit(): void {
   
  }

}
