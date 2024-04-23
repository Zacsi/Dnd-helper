import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyheroComponent } from './myhero.component';

const routes: Routes = [{ path: '', component: MyheroComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyheroRoutingModule { }
