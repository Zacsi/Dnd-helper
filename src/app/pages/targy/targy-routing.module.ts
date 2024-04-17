import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargyComponent } from './targy.component';


const routes: Routes = [
  { path: '', component: TargyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargyRoutingModule { }
