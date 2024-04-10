import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllensegKrealasRoutingModule } from './ellenseg-krealas-routing.module';
import { EllensegKrealasComponent } from './ellenseg-krealas.component';
//import { MainComponent } from '../main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EllensegKrealasComponent,
    //MainComponent,
    
  
  ],
  imports: [
    CommonModule,
    EllensegKrealasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EllensegKrealasModule { }
