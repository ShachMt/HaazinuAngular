import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsCategoryFirstComponent } from './institutions-category-first.component';

describe('InstitutionsCategoryFirstComponent', () => {
  let component: InstitutionsCategoryFirstComponent;
  let fixture: ComponentFixture<InstitutionsCategoryFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsCategoryFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsCategoryFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
