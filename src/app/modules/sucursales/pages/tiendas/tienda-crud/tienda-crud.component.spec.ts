import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaCrudComponent } from './tienda-crud.component';

describe('TiendaCrudComponent', () => {
  let component: TiendaCrudComponent;
  let fixture: ComponentFixture<TiendaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaCrudComponent]
    });
    fixture = TestBed.createComponent(TiendaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
