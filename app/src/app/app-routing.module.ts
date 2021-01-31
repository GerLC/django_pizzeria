import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
// Components
import { HomeComponent } from './components/home/home/home.component';
import { OrdenComponent } from './components/Pizza/orden/orden.component';
import { PizzaPedidoComponent } from './components/Pizza/pizza-pedido/pizza-pedido.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'pizza', component: PizzaPedidoComponent },
  {path: 'orden', component: OrdenComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(routes);