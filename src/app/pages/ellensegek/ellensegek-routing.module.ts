import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EllensegekComponent } from './ellensegek.component';


const routes: Routes = [{ path: '', component: EllensegekComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EllensegekRoutingModule { }
