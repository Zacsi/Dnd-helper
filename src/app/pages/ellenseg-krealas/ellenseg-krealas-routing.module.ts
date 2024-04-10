import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EllensegKrealasComponent } from './ellenseg-krealas.component';

const routes: Routes = [
  { path: '', component: EllensegKrealasComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EllensegKrealasRoutingModule { }
