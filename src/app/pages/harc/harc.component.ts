
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
  
    while (hp1 > 0 && hp2 > 0) {
      let eventLog = [];
      let attacker = Math.random() < 0.5 ? this.selectedFirst : this.selectedSecond; // Véletlenszerű kiválasztás
  
      let attackModifier = 1;
      let defenseModifier = 1;
      let criticalHitChance = Math.random() < 0.1;
      let missChance = Math.random() < 0.1;
      let stumbleChance = Math.random() < 0.1;
  
      if (attacker === this.selectedFirst) {
        attackModifier = 1 + (Math.random() * 0.2 - 0.1);
        defenseModifier = defense2;
  
        if (criticalHitChance) {
          attackModifier *= 2;
          eventLog.push('kritikus ütés');
        }
        if (missChance) {
          attackModifier = 0;
          eventLog.push('melléütés');
        }
        if (stumbleChance) {
          defenseModifier *= 0.5;
          eventLog.push('botlás');
        }
      } else {
        attackModifier = 1 + (Math.random() * 0.2 - 0.1);
        defenseModifier = defense1;
  
        if (criticalHitChance) {
          attackModifier *= 2;
          eventLog.push('kritikus ütés');
        }
        if (missChance) {
          attackModifier = 0;
          eventLog.push('melléütés');
        }
        if (stumbleChance) {
          defenseModifier *= 0.5;
          eventLog.push('botlás');
        }
      }
  
      let damageToSecond = attacker === this.selectedFirst ? Math.max((attack1 * attackModifier) - defenseModifier, 0) : 0;
      let damageToFirst = attacker === this.selectedSecond ? Math.max((attack2 * attackModifier) - defenseModifier, 0) : 0;
  
      hp2 -= damageToSecond;
      hp1 -= damageToFirst;
  
      if (attacker === this.selectedFirst) {
        this.battleLog.push(`${this.selectedFirst.name} üt ${damageToSecond.toFixed(1)} sebzést; ${this.selectedSecond.name} maradt ${Math.max(hp2, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      } else {
        this.battleLog.push(`${this.selectedSecond.name} üt ${damageToFirst.toFixed(1)} sebzést; ${this.selectedFirst.name} maradt ${Math.max(hp1, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      }
      
      if (hp2 <= 0 || hp1 <= 0) break;  // Ellenőrzés, hogy valaki kiesett-e
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
