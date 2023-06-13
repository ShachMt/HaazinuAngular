import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingClassificationComponent } from './awaiting-classification.component';

describe('AwaitingClassificationComponent', () => {
  let component: AwaitingClassificationComponent;
  let fixture: ComponentFixture<AwaitingClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
