import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-harc',
  templateUrl: './harc.component.html',
  styleUrls: ['./harc.component.scss']
})
export class HarcComponent implements OnInit {
  characters: Observable<any[]> = EMPTY; // Initializing with EMPTY
  enemies: Observable<any[]>= EMPTY; // Hozzáadva az ellenségek listája
  selectedFirst: any;
  selectedSecond: any;
  result: string = '';
  battleLog: string[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.characters = this.firestore.collection('characters').valueChanges();
    this.enemies = this.firestore.collection('Enemies').valueChanges(); // Ellenségek lekérése

  }

  simulateBattle() {
    if (!this.selectedFirst || !this.selectedSecond) {
        this.result = "Kérem válassza ki mindkét résztvevőt!";
        return;
    }

    let hp1 = this.selectedFirst.hp;
    let hp2 = this.selectedSecond.hp;
    let attack1 = this.selectedFirst.attack;
    let attack2 = this.selectedSecond.attack;
    let defense1 = this.selectedFirst.defense || 0;
    let defense2 = this.selectedSecond.defense || 0;
    this.battleLog = [];

    // Kezdő támadó kiválasztása
    let isFirstAttacking = Math.random() < 0.5;

    while (hp1 > 0 && hp2 > 0) {
        let attackModifier = 1 + (Math.random() * 0.2 - 0.1); // Támadás módosító
        let defenseModifier = isFirstAttacking ? defense2 : defense1; // Védelmi módosító
        let eventLog: string[] = []; // Események naplózása
        let damage = 0;

        // Kritikus ütés esélye
        if (Math.random() < 0.1) {
            attackModifier *= 2; // Kritikus ütés: támadási módosító duplázódik
            eventLog.push('kritikus ütés');
        }

        // Melléütés esélye
        if (Math.random() < 0.1) {
            attackModifier = 0; // Melléütés: támadás nem okoz sebzést
            eventLog.push('melléütés');
        }

        // Botlás esélye
        if (Math.random() < 0.1) {
            defenseModifier *= 0.5; // Botlás: a védelem feleződik
            eventLog.push('botlás');
        }

        if (isFirstAttacking) {
            // Az első támad
            damage = Math.max((attack1 * attackModifier) - defenseModifier, 0);
            hp2 -= damage;
            this.battleLog.push(`${this.selectedFirst.name} üt ${damage.toFixed(1)} sebzést; ${this.selectedSecond.name} maradt ${Math.max(hp2, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
        } else {
            // A második támad
            damage = Math.max((attack2 * attackModifier) - defenseModifier, 0);
            hp1 -= damage;
            this.battleLog.push(`${this.selectedSecond.name} üt ${damage.toFixed(1)} sebzést; ${this.selectedFirst.name} maradt ${Math.max(hp1, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
        }

        // Támadás váltása a következő körben
        isFirstAttacking = !isFirstAttacking;

        if (hp2 <= 0 || hp1 <= 0) break; // Ellenőrzés, hogy valaki kiesett-e
    }

    if (hp1 > 0) {
        this.result = `${this.selectedFirst.name} győzött!`;
    } else if (hp2 > 0) {
        this.result = `${this.selectedSecond.name} győzött!`;
    } else {
        this.result = "Döntetlen!";
    }
}




  
}
