import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DobokockaComponent } from './dobokocka.component';

const routes: Routes = [
  { path: '', component: DobokockaComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DobokockaRoutingModule { }
