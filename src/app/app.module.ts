import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { MainComponent } from './pages/main/main.component';
//import { KarakterekComponent } from './pages/karakterek/karakterek.component';
//import { KrealasComponent } from './pages/krealas/krealas.component';
import { MenuComponent } from './shared/menu/menu.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
//import { MyheroComponent } from './pages/myhero/myhero.component';
//import { LiveComponent } from './pages/live/live.component';
//import { TargyakComponent } from './pages/targyak/targyak.component';
//import { TargyComponent } from './pages/targy/targy.component';
//import { HarcComponent } from './pages/harc/harc.component';
//import { EllensegekComponent } from './pages/ellensegek/ellensegek.component';
//import { EllensegKrealasComponent } from './pages/ellenseg-krealas/ellenseg-krealas.component';
//import { DobokockaComponent } from './pages/dobokocka/dobokocka.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    //MyheroComponent,
    //LiveComponent,
    //TargyakComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireStorageModule  // This should be included

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
