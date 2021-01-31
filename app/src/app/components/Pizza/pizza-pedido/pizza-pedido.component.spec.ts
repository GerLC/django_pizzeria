import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaPedidoComponent } from './pizza-pedido.component';

describe('PizzaPedidoComponent', () => {
  let component: PizzaPedidoComponent;
  let fixture: ComponentFixture<PizzaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
