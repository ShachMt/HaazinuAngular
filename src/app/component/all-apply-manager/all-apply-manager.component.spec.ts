import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApplyManagerComponent } from './all-apply-manager.component';

describe('AllApplyManagerComponent', () => {
  let component: AllApplyManagerComponent;
  let fixture: ComponentFixture<AllApplyManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllApplyManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApplyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
