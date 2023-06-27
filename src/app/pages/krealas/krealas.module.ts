import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KrealasRoutingModule } from './krealas-routing.module';
import { KrealasComponent } from './krealas.component';
import { MainComponent } from '../main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    KrealasComponent,
    MainComponent,
    
  
  ],
  imports: [
    CommonModule,
    KrealasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KrealasModule { }
