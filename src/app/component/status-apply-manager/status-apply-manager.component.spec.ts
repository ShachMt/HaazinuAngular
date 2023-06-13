import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusApplyManagerComponent } from './status-apply-manager.component';

describe('StatusApplyManagerComponent', () => {
  let component: StatusApplyManagerComponent;
  let fixture: ComponentFixture<StatusApplyManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusApplyManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusApplyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
