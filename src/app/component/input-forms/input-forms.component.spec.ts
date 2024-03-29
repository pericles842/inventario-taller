import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormsComponent } from './input-forms.component';

describe('InputFormsComponent', () => {
  let component: InputFormsComponent;
  let fixture: ComponentFixture<InputFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFormsComponent]
    });
    fixture = TestBed.createComponent(InputFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
