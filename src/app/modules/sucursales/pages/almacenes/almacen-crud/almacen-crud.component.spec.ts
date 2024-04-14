import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenCrudComponent } from './almacen-crud.component';

describe('AlmacenCrudComponent', () => {
  let component: AlmacenCrudComponent;
  let fixture: ComponentFixture<AlmacenCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenCrudComponent]
    });
    fixture = TestBed.createComponent(AlmacenCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
