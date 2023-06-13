import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTratmentDetailsManagerComponent } from './new-tratment-details-manager.component';

describe('NewTratmentDetailsManagerComponent', () => {
  let component: NewTratmentDetailsManagerComponent;
  let fixture: ComponentFixture<NewTratmentDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTratmentDetailsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTratmentDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
