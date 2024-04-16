import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HarcComponent } from './harc.component';


const routes: Routes = [{ path: '', component: HarcComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarcRoutingModule { }
