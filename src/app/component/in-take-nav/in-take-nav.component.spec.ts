import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTakeNavComponent } from './in-take-nav.component';

describe('InTakeNavComponent', () => {
  let component: InTakeNavComponent;
  let fixture: ComponentFixture<InTakeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InTakeNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InTakeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
