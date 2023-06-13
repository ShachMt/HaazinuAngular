import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillNewApplyComponent } from './fill-new-apply.component';

describe('FillNewApplyComponent', () => {
  let component: FillNewApplyComponent;
  let fixture: ComponentFixture<FillNewApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillNewApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillNewApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
