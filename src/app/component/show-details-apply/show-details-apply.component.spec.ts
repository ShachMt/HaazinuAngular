import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsApplyComponent } from './show-details-apply.component';

describe('ShowDetailsApplyComponent', () => {
  let component: ShowDetailsApplyComponent;
  let fixture: ComponentFixture<ShowDetailsApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
