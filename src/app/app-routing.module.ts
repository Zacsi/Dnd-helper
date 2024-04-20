import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
{
  path: 'krealas',
  loadChildren: () => import('./pages/krealas/krealas.module').then(m=>m.KrealasModule)
},
{
  path: 'karakterek',
  loadChildren: () => import('./pages/karakterek/karakterek.module').then(m=>m.KarakterekModule)
},
{
  path: 'main',
  loadChildren: () => import('./pages/main/main.module').then(m=>m.MainModule)
},
{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
{ path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
{ path: 'dobokocka', loadChildren: () => import('./pages/dobokocka/dobokocka.module').then(m => m.DobokockaModule) },
{ path: 'ellenseg-krealas', loadChildren: () => import('./pages/ellenseg-krealas/ellenseg-krealas.module').then(m => m.EllensegKrealasModule) },
{ path: 'ellensegek', loadChildren: () => import('./pages/ellensegek/ellensegek.module').then(m => m.EllensegekModule) },
{ path: 'harc', loadChildren: () => import('./pages/harc/harc.module').then(m => m.HarcModule) },
{ path: 'targy', loadChildren: () => import('./pages/targy/targy.module').then(m => m.TargyModule) },
{ path: 'targyak', loadChildren: () => import('./pages/targyak/targyak.module').then(m => m.TargyakModule) },
{ path: 'live', loadChildren: () => import('./pages/live/live.module').then(m => m.LiveModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

