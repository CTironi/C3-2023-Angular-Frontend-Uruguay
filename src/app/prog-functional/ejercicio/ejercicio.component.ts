import { Component } from '@angular/core';
import { filter, from } from 'rxjs';
import { CustomerArray } from '../customer-data/customer.data';
import { CustomerModel } from '../../interfaces/Customer.interface';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})

export class EjercicioComponent {
  constructor(private readonly customerArray: CustomerArray ) {}


  /**
   * Aplicar 6 transformaciones de datos 3 con observables y 3 sin.
   * Se deben usar 2 operadores funcionales para cada transformacion.
   *
   * Se debe crear una funcion pura, a demas de la que dio el coach
   *
   * A partir de la funcion pura crear una composicion de funciones y
   * una funcion de orden superior o un callback.
   *
   * Funcion de orden superior: Tomar una o más funciones como entrada y Devolver una función como salida
   * Comopsicion de funciones: Componer funciones se basa en combinar funciones simples para construir funciones más complicadas
   */

  //funcion pura
  newData!: CustomerModel;
  transform(document: string) {
    from(this.customerArray.baseCustomers).pipe(
      filter(n => n.document === document),
    ).subscribe((data) => this.newData = data)
  }
}


