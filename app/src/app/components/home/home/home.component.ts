import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  // Variables
  pedidoFormControl: any;
  // Estado
  isWait: boolean = false;
  // Img
  images= [`/assets/images/pizza.jpg`, `/assets/images/pizza2.jpg`, `/assets/images/pizza3.jpg`]


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pizzaService: PizzaService,
    public config: NgbCarouselConfig,
  ) {
    config.interval = 5000;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
   }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    this.pedidoFormControl = this.fb.group({
     metodo: ["",
     Validators.compose([
       Validators.required,
       Validators.maxLength(10),
     ]),],
     usuario: ["",
     Validators.compose([
       Validators.required,
       Validators.maxLength(10),
     ]),],
     direccion: ["",
     Validators.compose([
       Validators.required,
       Validators.maxLength(10),
     ]),],

   });
 }



//  Crea
add(): void {
  const today = new Date();
  this.isWait = true;
  const newMarca: any = {
    estatus_pedido: "En Proceso",
    fecha_pedido: today,
    total_pedido: 0,
    metodo_pedido: this.pedidoFormControl.get("metodo").value,
    usuario:this.pedidoFormControl.get("usuario").value,
    direccion_pedido: this.pedidoFormControl.get("direccion").value,
  };

  this.pizzaService.createPedido(newMarca).subscribe((response) => {   
    console.log(response)
    this.pedidoPizza(response.id)
    this.isWait = false;
});
}

// QueryParam
pedidoPizza(idPedido: number){

  this.router.navigate(['/pizza'], { queryParams: {
    pedido: idPedido
  }});
}


}