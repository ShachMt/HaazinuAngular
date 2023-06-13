import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsCategoryComponent } from './institutions-category.component';

describe('InstitutionsCategoryComponent', () => {
  let component: InstitutionsCategoryComponent;
  let fixture: ComponentFixture<InstitutionsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
