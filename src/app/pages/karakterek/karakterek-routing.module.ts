import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KarakterekComponent } from './karakterek.component';

const routes: Routes = [{ path: '', component: KarakterekComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarakterekRoutingModule { }
