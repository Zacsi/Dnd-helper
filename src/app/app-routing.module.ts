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




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

