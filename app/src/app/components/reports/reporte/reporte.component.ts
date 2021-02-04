import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Usuario', 'Estatus', 'Fecha Solicitud', 'Medio', 'Direccion', 'Total' ];
  dataSource!: MatTableDataSource<any>;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getPizzas();
    this.getToppinPizza();
    this.getOrden();
    this.getBebidas();
  }


  ngAfterViewInit() {

  }


  getPizzas(): void {
    this.pizzaService.getPizzas().subscribe((data) =>
    {
      this.pizza = data;

      // console.log('Factura PizzaTime!', this.pizza)
    })
  }

  
  getToppinPizza(): void {
    this.pizzaService.getToppinPizza().subscribe((data) =>
    {
      this.toppinSelected = data ;

      // console.log('Factura Toppin', this.toppinSelected)
    })
  }

  getBebidas() {
    this.pizzaService.getBebidaPedido().subscribe((data)=> {
      this.bebidas = data;
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

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
