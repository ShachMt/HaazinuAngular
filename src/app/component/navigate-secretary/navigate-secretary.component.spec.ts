import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateSecretaryComponent } from './navigate-secretary.component';

describe('NavigateSecretaryComponent', () => {
  let component: NavigateSecretaryComponent;
  let fixture: ComponentFixture<NavigateSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateSecretaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
