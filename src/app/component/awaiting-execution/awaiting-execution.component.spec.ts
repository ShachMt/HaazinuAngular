import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingExecutionComponent } from './awaiting-execution.component';

describe('AwaitingExecutionComponent', () => {
  let component: AwaitingExecutionComponent;
  let fixture: ComponentFixture<AwaitingExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
