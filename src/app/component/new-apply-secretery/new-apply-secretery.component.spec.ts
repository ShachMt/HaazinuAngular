import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplySecreteryComponent } from './new-apply-secretery.component';

describe('NewApplySecreteryComponent', () => {
  let component: NewApplySecreteryComponent;
  let fixture: ComponentFixture<NewApplySecreteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApplySecreteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplySecreteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
