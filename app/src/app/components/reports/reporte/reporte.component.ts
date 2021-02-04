import { Component, OnInit } from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [DatePipe],
})
export class ReporteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Usuario', 'Estatus', 'Fecha Solicitud', 'Medio', 'Direccion', 'Total' ];
  dataSource!: MatTableDataSource<any>;
  expandedElement: any | null;


  // Tabla 2
  Columns: string[] = ['N°Pizza', 'Tamano', 'Toppin','Usuario', 'N°Pedido', 'Fecha Solicitud' ];
  dataSource2!: MatTableDataSource<any>;


  @ViewChild(MatSort, { static: false })
  sort: MatSort = new MatSort;

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  // Pizza
  tamanoPizza: any[] = [];
  bebidas: any[] = [];
  toppins: any[] = [];

  pedidos: any[] = [];
  pizza: any[] = [];
  toppinSelected: any[] = [];

  pedidoFilter:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe
  ) {

   }

  ngOnInit(): void {
    this.getOrden();
    this.getToppinPizza();
    this.getTamano();
    this.getIngre();
  }



  ngAfterViewInit() {

  }

  getTamano(): void {
    this.pizzaService.getTamanoPizza().subscribe((data) =>
    {
      this.tamanoPizza = data;
    })
  }

  getIngre(): void {
    this.pizzaService.getIngredientes().subscribe((data) =>
    {
      this.toppins = data;
    })
  }

  getPizzas(pedido: any): void {
    this.pizzaService.getPizzas().subscribe((data) =>
    {
      this.pizza = data;
      this.pizza = this.pizza.filter(item => item.id_pedido.id == pedido )

      // console.log('Factura PizzaTime!', this.pizza)
    })
  }

  
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data ;

      // console.log('Factura Toppin', this.toppinSelected)

      this.dataSource2 = new MatTableDataSource(this.toppinSelected);


    })
  }

  getBebidas(pedido: any) {
    this.pizzaService.getBebidaPedido().subscribe((data)=> {
      this.bebidas = data;
      this.bebidas = this.bebidas.filter(item => item.id_pedido.id == pedido )

      // console.log('Bebidas', this.bebidas)

    })
  }

  getOrden(): void {
    this.pizzaService.getOrden().subscribe((data) =>
    {
      this.pedidos = data;
      console.log('PedidoOrden', this.pedidos)

      this.dataSource = new MatTableDataSource(this.pedidos);


      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

      
      for (let i = 0; i < this.pedidos.length; i++) {
        this.pedidos[i];
        let aux =  this.pedidos[i+1];
        // console.log('pe', this.pedidos[i].usuario, 'aux' , aux.usuario)
        if (this.pedidos[i].usuario != aux.usuario) 
        {
          // console.log('DISTINO pe', this.pedidos[i].usuario, 'aux' , aux.usuario)
          this.pedidoFilter.push(this.pedidos[i])

        } else {
          // console.log('IGUALpe', this.pedidos[i].usuario, 'aux' , aux.usuario)
          
        }
        
    }

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

// TABLE 1

  // search(selectedValue: string, selectedValueEle: string) {
  search(selectedValue: string) {
    selectedValue = selectedValue.trim(); 
    selectedValue = selectedValue.toLowerCase(); 
    // this.dataSource.filter = selectedValue + selectedValueEle;
    this.dataSource.filter = selectedValue;

}


  dateSearch(date: any) {
    this.pizzaService.getOrden().subscribe((data) =>
    {
      this.pedidos = data;
      this.pedidos = this.pedidos.filter(item =>  this.datepipe.transform(item.fecha_pedido, 'M/d/yyyy') == date)

      console.log(date);
      
      this.dataSource = new MatTableDataSource(this.pedidos);

      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

    })
  }

  sorted() {
      this.pizzaService.getOrden().subscribe((data) =>
      {
        this.pedidos = data;
        this.pedidos = this.pedidos.sort((a,b) => a.usuario.localeCompare(b.usuario));
        this.pedidos = this.pedidos.reverse();

        
        this.dataSource = new MatTableDataSource(this.pedidos);

        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
  
      })
    }
    

    // TABLA 2
  
    sorted2() {
      this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data ;

      // console.log('Factura Toppin', this.toppinSelected)
      this.toppinSelected = this.toppinSelected.sort((a,b) => a.id_pizza.id_tamano.nombre_tamano.localeCompare(b.id_pizza.id_tamano.nombre_tamano));
      this.toppinSelected = this.toppinSelected.reverse();
      this.dataSource2 = new MatTableDataSource(this.toppinSelected);
    })
  }

  tamanos(tamano: any) {
    this.pizzaService.getToppinPizza().subscribe((data) =>
  {
    this.toppinSelected = data ;
    this.toppinSelected =  this.toppinSelected.filter(item=> item.id_pizza.id_tamano.nombre_tamano == tamano)


    // console.log('Factura Toppin', this.toppinSelected)

    this.dataSource2 = new MatTableDataSource(this.toppinSelected);
  })
}

searchToppin(toppin: any) {
  this.pizzaService.getToppinPizza().subscribe((data) =>
{
  this.toppinSelected = data ;
  this.toppinSelected =  this.toppinSelected.filter(item=> item.id_toppin.nombre_toppin == toppin)


  // console.log('Factura Toppin', this.toppinSelected)

  this.dataSource2 = new MatTableDataSource(this.toppinSelected);
})
}



searchDouble(tamano: any, toppin: any, isStrict: any) {
  this.pizzaService.getToppinPizza().subscribe((data) =>
{
  this.toppinSelected = data ;
  if (isStrict ==1) {
    this.toppinSelected =  this.toppinSelected.filter(item=> 
      item.id_toppin.nombre_toppin == toppin ||
      item.id_pizza.id_tamano.nombre_tamano == tamano)
  } else {
    this.toppinSelected =  this.toppinSelected.filter(item=> 
      item.id_toppin.nombre_toppin == toppin &&
      item.id_pizza.id_tamano.nombre_tamano == tamano)
  }


  // console.log('Factura Toppin', this.toppinSelected)

  this.dataSource2 = new MatTableDataSource(this.toppinSelected);

})
}



}
