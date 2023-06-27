import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KrealasComponent } from './krealas.component';

const routes: Routes = [
  { path: '', component: KrealasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KrealasRoutingModule { }
