import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Route, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pizza-pedido',
  templateUrl: './pizza-pedido.component.html',
  styleUrls: ['./pizza-pedido.component.scss']
})
export class PizzaPedidoComponent implements OnInit {

  // Variables
  // Estados
  isLinear = false;
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

  // VAR AXILIARES
  pizza: any;
  toppinSelected: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private _snackBar: MatSnackBar
  ) { }


  // SnackBar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  nav(){
    this.openSnackBar( 'Generando Factura ', 'ok')
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
  // Actualiza el monto del pedido 
  updateMonto(pedido: any, monto: any): void {

    const pedidoN: any = {
      estatus_pedido: 'Pedido', 
      fecha_pedido: pedido.fecha_pedido,
      total_pedido: parseFloat(pedido.total_pedido) + parseFloat(monto),
      metodo_pedido: pedido.metodo_pedido,
      usuario: pedido.usuario,
      direccion_pedido: pedido.direccion_pedido,
    };

    this.pizzaService.updateMonto(this.pedido.pedido,pedidoN).subscribe((response) => {

      console.log ('Monto', response)
      this.getToppinPizza();
      this.getOrderId();
    })
  }

  // GETs

  // Obtener Tamano de Pizzas Disponibles en la BD
  getTamano(): void {
    this.pizzaService.getTamanoPizza().subscribe((data) =>
    {
      this.tamanoPizza = data;
      // console.log(this.tamanoPizza)
    })
  }

  // Obtener Toppins Disponibles en la BD
  getToppin(): void {
    this.pizzaService.getIngredientes().subscribe((data) =>
    {
      this.toppins = data;
      // console.log(this.toppins)
    })
  }

  // Obtener bebidas disponibles en la BD
  getBebida(): void {
    this.pizzaService.getBebidas().subscribe((data) =>
    {
      this.bebidas = data;
      // console.log(this.bebidas)
    })
  }

  // Obtener Pizza disponible en la BD
  // Utilizados para mostrar la Pizza Pedida
  getPizza(id: number): void {
    this.pizzaService.getPizza(id).subscribe((data) =>
    {
      this.pizza = data;
      // console.log('PizzaTime!', this.pizza)
    })
  }


  // Obtener Pizza disponible en la BD
  // Utilizados para mostrar los Toppins de la  Pizza Pedida
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data;
      // console.log('TOPINSELECTED', this.toppinSelected)
    })
  }

  // Obtener el Numero de Pedido creado
  // Este ID es la orden que se asociara todas las Pizzas Bebidas pedidas
  getOrderId(): void {
    this.pizzaService.getOrdenById(this.pedido.pedido).subscribe((data) =>
    {
      this.pedidos = data;
      // console.log('PedidoOrden', this.pedidos)
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

  createBebi(bebida:any , montob: any) {
    this.isWait = true;
    this.pizzaService.addBebida(bebida).subscribe((response) => {
      this.isWait = false;
      // console.log('Creando BEBIDA actualizar', this.monto)
      // this.updateMonto(this.pedidos,this.monto);
      this.openSnackBar('Bebidas Guardadas ', 'Bebidas!');

    })
  }

  // ADD Forms

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

  //  Crea
  addPizza(): void {

    this.monto = parseFloat(this.pizzaFormControl.get("id_tamano").value.monto_tamano);
  
    const newPizza: any = {
      id_pedido: this.pedido.pedido,
      id_tamano: this.pizzaFormControl.get("id_tamano").value.id,
    };
    console.log(newPizza);
  
    this.openSnackBar('Pizza ' + this.pizzaFormControl.get("id_tamano").value.nombre_tamano, 'Ok!');
  
    this.createPizza(newPizza);
  
  }

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
    console.log("Array is empty!")
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
      return this.bebidaFormControl.get("bebida") as FormArray
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

  createBebida(): void {
    let newToppin: any;
    let idBebida: any; 
    let montoB: number= 0;
 

    for(let i = 0; i < this.bebida.length; i++) {
  
      idBebida = this.bebida.at(i).value;
  
      const newBebida: any = {
        id_pedido: this.pedido.pedido,
        id_bebida: idBebida.id_bebida.id
      };


      if (this.bebida.length === 0) {
         console.log("Array is empty!")
         } else {
          this.createBebi(newBebida, montoB);
        }
        

        newToppin = idBebida.id_bebida.monto_bebida;
        montoB += parseFloat(newToppin);  
        // this.monto += parseFloat(newToppin);  

      } 

      this.updateMonto(this.pedidos,montoB);
      console.log('MontoBebidaAntes', montoB);

  
    }
  
}
