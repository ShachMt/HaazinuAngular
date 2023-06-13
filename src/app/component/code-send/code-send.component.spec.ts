import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSendComponent } from './code-send.component';

describe('CodeSendComponent', () => {
  let component: CodeSendComponent;
  let fixture: ComponentFixture<CodeSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
