import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargyakComponent } from './targyak.component';


const routes: Routes = [{ path: '', component: TargyakComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargyakRoutingModule { }
