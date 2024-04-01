import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFormMenuComponent } from './general-form-menu.component';

describe('GeneralFormMenuComponent', () => {
  let component: GeneralFormMenuComponent;
  let fixture: ComponentFixture<GeneralFormMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralFormMenuComponent]
    });
    fixture = TestBed.createComponent(GeneralFormMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
