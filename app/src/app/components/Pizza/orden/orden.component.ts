import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {
  
  // Pedido 
  @Input() pedido: any; // decorate the property with @Input()

  pizza: any[] = [];
  toppinSelected: any[] = [];
  bebidas: any[] = [];
  pedidos: any;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,

  ) { }

  ngOnInit(): void {
    console.log(this.pedido)
    this.getOrderId();
    this.getPizzas();
    this.getBebidas();
    this.getToppinPizza();

  }

  getPizzas(): void {
    this.pizzaService.getPizzas().subscribe((data) =>
    {
      this.pizza = data;
      console.log('Factura PizzaTime!', this.pizza)
    })
  }

  
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data;

      console.log('Factura Toppin', this.toppinSelected)
    })
  }

  getBebidas() {
    this.pizzaService.getBebidaPedido().subscribe((data)=> {
      this.bebidas = data;
    })
  }

  getOrderId(): void {
    this.pizzaService.getOrdenById(this.pedido).subscribe((data) =>
    {
      this.pedidos = data;
      console.log('Factura PedidoOrden', this.pedidos)
    })
  }

}
