import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , throwError} from "rxjs";
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  readonly END_POINT = '//localhost:8000/api/pizzeria';

  constructor(public http: HttpClient) { }

  // GET
 
  getTamanoPizza(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/tamanopizza/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Tamano Pizza`)),
      catchError(this.handleError<any>(`getTamanoPizza`))
    );
  }

  getIngredientes(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/toppin/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Ingredientes Pizza`)),
      catchError(this.handleError<any>(`getIngredientes`))
    );
  }

  getBebidas(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/bebida/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Bebidas`)),
      catchError(this.handleError<any>(`getBebidas`))
    );
  }

  getPizza(id: number): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/getpizza/'+id+'/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched pizza`)),
      catchError(this.handleError<any>(`getPizza`))
    );
  }


  getPizzas(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/getpizza/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched pizzas`)),
      catchError(this.handleError<any>(`getPizzas`))
    );
  }

  getToppinPizza(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/getpizzatoppin/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched toppin`)),
      catchError(this.handleError<any>(`getToppinPizza`))
    );
  }

  getBebidaPedido(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/getbebidapedido/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Bebidas`)),
      catchError(this.handleError<any>(`getBebidaPedido`))
    );
  }

  getOrden(): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/pedido/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Pedido`)),
      catchError(this.handleError<any>(`getOrden`))
    );
  }

  getOrdenById(id: number): Observable<any> {
    return this.http.get<any>(this.END_POINT+'/pedido/'+id+'/', this.httpOptions ).pipe(retry(2),
      tap(_ => this.log(`fetched Pedido`)),
      catchError(this.handleError<any>(`getOrdenById`))
    );
  }

  // POST

  createPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.END_POINT+'/pedido/', pedido, this.httpOptions ).pipe(
      tap(_ => this.log(`fetched pedido Pizza`)),
      catchError(this.handleError<any>(`createPedido`))
    );
  }

  createPizza(pizza: any): Observable<any> {
    return this.http.post<any>(this.END_POINT+'/pizza/', pizza, this.httpOptions ).pipe(
      tap(_ => this.log(`fetched pedido Pizza`)),
      catchError(this.handleError<any>(`createPizza`))
    );
  }

  addToppin(toppin: any): Observable<any> {
    return this.http.post<any>(this.END_POINT+'/pizzatoppin/', toppin, this.httpOptions ).pipe(
      tap(_ => this.log(`fetched toppin Pizza`)),
      catchError(this.handleError<any>(`addToppin`))
    );
  }
  
  
  addBebida(bebida: any): Observable<any> {
    return this.http.post<any>(this.END_POINT+'/bebidapedido/', bebida, this.httpOptions ).pipe(
      tap(_ => this.log(`fetched bebida`)),
      catchError(this.handleError<any>(`addBebida`))
    );
  }
  

  // PUT

  updateMonto(id: number,pedido: any): Observable<any> {
    return this.http.put<any>(this.END_POINT+'/pedido/'+id+'/', pedido, this.httpOptions ).pipe(
      tap(_ => this.log(`fetched pedido Pizza`)),
      catchError(this.handleError<any>(`addBebida`))
    );
  }
  

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`PizzaService: ${message}`);
  }

}
