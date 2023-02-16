import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { SearchComponent } from './search/search.component';
import { ComponentsRouteModule } from './components-route.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';



@NgModule({
  declarations: [
    DeleteComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    ComponentsRouteModule,
  ]
})
export class ComponentsModule { }
