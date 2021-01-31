import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Route, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pizza-pedido',
  templateUrl: './pizza-pedido.component.html',
  styleUrls: ['./pizza-pedido.component.scss']
})
export class PizzaPedidoComponent implements OnInit {

  // Variables
  // Estados
  isLinear = true;
  isWait = false;

  // Pedido 
  pedido: any;
  pedidos: any;
  monto: number = 0;

  // Forms
  pizzaFormControl: any;
  toppinFormControl: any;
  bebidaFormControl: any;


  // Pizza
  tamanoPizza: any[] = [];
  bebidas: any[] = [];
  toppins: any[] = [];



  // Array
  pizza: any;
  toppinSelected: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
  ) { }



  nav(){
    this.router.navigateByUrl('/', { skipLocationChange : true}).then( ( ) => {
      this.router.navigate(['/pizza'], { queryParams: {
        pedido: this.pedido.pedido
      }});
    })
  }

  

  ngOnInit(): void {
    // Obtener el Numero de Pedido
    this.route.queryParams.subscribe(
      response =>
      {
        this.pedido = response;
        console.log(this.pedido);
      });

    this.getTamano();
    this.getToppin();
    this.getBebida();
    this.getOrderId();
    this.buildForm();
  }

  // UpdateMonto
  updateMonto(pedido: any, monto: any): void {

    const pedidoN: any = {
      estatus_pedido: pedido.estatus_pedido,
      fecha_pedido: pedido.fecha_pedido,
      total_pedido: parseFloat(pedido.total_pedido) + parseFloat(monto),
      metodo_pedido: pedido.metodo_pedido,
      usuario: pedido.usuario,
      direccion_pedido: pedido.direccion_pedido,
    };

    this.pizzaService.updateMonto(this.pedido.pedido,pedidoN).subscribe((response) => {

      this.getToppinPizza();
      this.getOrderId();
    })
  }

  // Obtener objetos
  getTamano(): void {
    this.pizzaService.getTamanoPizza().subscribe((data) =>
    {
      this.tamanoPizza = data;
      console.log(this.tamanoPizza)
    })
  }

  getToppin(): void {
    this.pizzaService.getIngredientes().subscribe((data) =>
    {
      this.toppins = data;
      console.log(this.toppins)
    })
  }

  getBebida(): void {
    this.pizzaService.getBebidas().subscribe((data) =>
    {
      this.bebidas = data;
      console.log(this.bebidas)
    })
  }

  getPizza(id: number): void {
    this.pizzaService.getPizza(id).subscribe((data) =>
    {
      this.pizza = data;
      console.log('PizzaTime!', this.pizza)
    })
  }


  
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data;
      console.log('TOPINSELECTED', this.toppinSelected)
    })
  }


  getOrderId(): void {
    this.pizzaService.getOrdenById(this.pedido.pedido).subscribe((data) =>
    {
      this.pedidos = data;
      console.log('PedidoOrden', this.pedidos)
    })
  }

  // Create

  createPizza(pizza : any) {
    this.isWait = true;
    this.pizzaService.createPizza(pizza).subscribe((response) =>
    {
      console.log(response)
      this.add(response.id)
      this.isWait = false;
      this.getPizza(response.id);
    })

  }

  createToppin(toppin: any) {
    this.isWait = true;
    this.pizzaService.addToppin(toppin).subscribe((response) =>
    {
      console.log(response);
      this.isWait = false;
      this.getToppinPizza();

      console.log(this.pedidos, this.monto);

      this.updateMonto(this.pedidos,this.monto);
    })
  }


  // ADD Forms

  //  Crea
  addPizza(): void {

  this.monto = parseFloat(this.pizzaFormControl.get("id_tamano").value.monto_tamano);

  const newPizza: any = {
    id_pedido: this.pedido.pedido,
    id_tamano: this.pizzaFormControl.get("id_tamano").value.id,
  };
  console.log(newPizza);

  this.createPizza(newPizza);

}

  buildForm(): void {
    this.pizzaFormControl = this.fb.group({
     id_tamano: ["",
     Validators.compose([
      Validators.required,
      ]),],
    });

    this.toppinFormControl = this.fb.group({
      toppin: this.fb.array([])
     });

    this.bebidaFormControl = this.fb.group({
      bebida: this.fb.array([])
    });

  }

  // TOPPIN

  get toppin() : FormArray {
    return this.toppinFormControl.get("toppin") as FormArray
  }

  formToppin(){
    return this.fb.group({
      id_toppin:['', Validators.compose([
        Validators.required])
      ],
    })
  }


  addToppin() {
    this.toppin.push(this.formToppin());
}

  deleteToppin(index: number) {
    this.toppin.removeAt(index);
}

add(id: number): void {
  let newToppin: any;
  let idToppin: any; 
  if (this.toppin.length === 0) { 
    console.log("Array is empty!");
    this.updateMonto(this.pedidos,this.monto);
  }

  for(let i = 0; i < this.toppin.length; i++) {

    idToppin = this.toppin.at(i).value;

    const newPizza: any = {
      id_pizza: id,
      id_toppin: idToppin.id_toppin.id
    };

    if (this.toppin.length === 0) {
       console.log("Array is empty!")
       } else {
        this.createToppin(newPizza)
       }
      
      newToppin = idToppin.id_toppin.monto_toppin;
      this.monto += parseFloat(newToppin);

    } 
    console.log('Monto Final', this.monto);

  }


  // Bebidas

    get bebida() : FormArray {
      return this.toppinFormControl.get("bebida") as FormArray
    }
  
    formBebida(){
      return this.fb.group({
        id_bebida:['', Validators.compose([
          Validators.required])
        ],
      })
    }
  
  
    addBebida() {
      this.bebida.push(this.formBebida());
  }
  
    deleteBebida(index: number) {
      this.bebida.removeAt(index);
  }

}
