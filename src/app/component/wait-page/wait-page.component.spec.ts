import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitPageComponent } from './wait-page.component';

describe('WaitPageComponent', () => {
  let component: WaitPageComponent;
  let fixture: ComponentFixture<WaitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
