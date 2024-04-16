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
  
    while (hp1 > 0 && hp2 > 0) { //TODO ha bekövetkezik akkor csak az egyiknél kellene hogy bekövetkezzen ne mindkét félnél
      let eventLog = [];  // Tömb a kör eseményeinek rögzítésére
      let criticalHitChance = Math.random() < 0.1;
      let missChance = Math.random() < 0.1;
      let stumbleChance = Math.random() < 0.1;
  
      let attackModifier = 1 + (Math.random() * 0.2 - 0.1);
      let defenseModifier = 1 + (Math.random() * 0.2 - 0.1);
  
      if (criticalHitChance) {
        attackModifier *= 2;
        eventLog.push('kritikus ütés');
      }
      if (missChance) {
        eventLog.push('melléütés');
      }
      if (stumbleChance) {
        defenseModifier *= 0.5;
        eventLog.push('botlás');
      }
  
      let damageToSecond = missChance ? 0 : Math.max((attack1 * attackModifier) - (defense2 * defenseModifier), 0);
      let damageToFirst = missChance ? 0 : Math.max((attack2 * attackModifier) - (defense1 * defenseModifier), 0);
  
      hp2 -= damageToSecond;
      hp1 -= damageToFirst;
  
      this.battleLog.push(`${this.selectedFirst.charactername} üt ${damageToSecond.toFixed(1)} sebzést; ${this.selectedSecond.enemyname} maradt ${Math.max(hp2, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      if (hp2 <= 0) break;  // Ellenőrzés, hogy az ellenség kiesett-e
  
      this.battleLog.push(`${this.selectedSecond.enemyname} üt ${damageToFirst.toFixed(1)} sebzést; ${this.selectedFirst.charactername} maradt ${Math.max(hp1, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      if (hp1 <= 0) break;  // Ellenőrzés, hogy a karakter kiesett-e
    }
  
    if (hp1 > 0) {
      this.result = `${this.selectedFirst.charactername} győzött!`;
    } else if (hp2 > 0) {
      this.result = `${this.selectedSecond.enemyname} győzött!`;
    } else {
      this.result = "Döntetlen!";
    }
  }
}