import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApplicantsComponent } from './details-applicants.component';

describe('DetailsApplicantsComponent', () => {
  let component: DetailsApplicantsComponent;
  let fixture: ComponentFixture<DetailsApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
