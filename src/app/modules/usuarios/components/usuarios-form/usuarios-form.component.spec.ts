import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFormComponent } from './usuarios-form.component';

describe('UsuariosFormComponent', () => {
  let component: UsuariosFormComponent;
  let fixture: ComponentFixture<UsuariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosFormComponent]
    });
    fixture = TestBed.createComponent(UsuariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
