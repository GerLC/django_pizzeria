import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit,  OnChanges {
  
  // Pedido 
  @Input() pedido: any; // decorate the property with @Input()

  pizza: any[] = [];
  toppinSelected: any[] = [];
  bebidas: any[] = [];
  pedidos: any;
  cantidadData: any[] = [];
  cantidad: any;
  id: any;

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

    // this.id = setInterval(() => {
    //   this.getOrderId();
    //   this.getPizzas();
    //   this.getBebidas();
    //   this.getToppinPizza();
    // }, 5000);

  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      
    (changes.pedido.currentValue);
    this.getOrderId();
    this.getPizzas();
    this.getBebidas();
    this.getToppinPizza();
}

  getPizzas(): void {
    this.pizzaService.getPizzas().subscribe((data) =>
    {
      this.pizza = data;
      this.cantidadData = this.pizza;
      this.cantidadData = this.cantidadData.filter(item => item.id_pedido.id == this.pedido );

      this.cantidad = this.cantidadData.length;
      console.log('Factura PizzaTime!', this.pizza)
    })
  }

  
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data ;

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


  print() {
    window.print();
  }

}
