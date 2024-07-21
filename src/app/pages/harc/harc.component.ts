import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-harc',
  templateUrl: './harc.component.html',
  styleUrls: ['./harc.component.scss']
})
export class HarcComponent implements OnInit, AfterViewInit {
  @ViewChild('inputDialog') inputDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  confirmDialogRef!: MatDialogRef<any>;

  characters: Observable<any[]> = EMPTY;
  enemies: Observable<any[]> = EMPTY;
  selectedFirst: any;
  selectedSecond: any;
  result: string = '';
  battleLog: string[] = [];
  round: number = 1;
  attackRoll: number | null = null;
  defenseRoll: number | null = null;
  hp1: number = 0;
  hp2: number = 0;
  isFirstAttacking: boolean = true;
  mode: 'simulation' | 'manual' | null = null;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit() {
    this.characters = this.firestore.collection('characters').valueChanges();
    this.enemies = this.firestore.collection('Enemies').valueChanges();
  }

  ngAfterViewInit() {
    // Üres metódus, hogy a ViewChild biztosan inicializálódjon
  }

  startBattle() {
    if (!this.selectedFirst || !this.selectedSecond) {
      this.result = "Kérem válassza ki mindkét résztvevőt!";
      return;
    }
    this.resetBattle();
    if (this.mode === 'simulation') {
      this.simulateBattle();
    } else if (this.mode === 'manual') {
      this.openInputDialog();
    }
  }

  resetBattle() {
    this.battleLog = [];
    this.hp1 = this.selectedFirst.hp;
    this.hp2 = this.selectedSecond.hp;
    this.isFirstAttacking = Math.random() < 0.5;
    this.round = 1;
    this.result = '';
  }

  simulateBattle() {
    const battleResult = this.onevsone(
      this.hp1,
      this.hp2,
      this.selectedFirst.attack,
      this.selectedSecond.attack,
      this.selectedFirst.defense || 0,
      this.selectedSecond.defense || 0,
      this.selectedFirst.name,
      this.selectedSecond.name
    );

    this.battleLog = battleResult.battleLog;
    this.result = battleResult.result;
  }

  openInputDialog(): void {
    this.dialogRef = this.dialog.open(this.inputDialog, {
      width: '250px',
      data: { attackRoll: this.attackRoll, defenseRoll: this.defenseRoll }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result && result.attackRoll !== undefined && result.defenseRoll !== undefined) {
        this.attackRoll = result.attackRoll;
        this.defenseRoll = result.defenseRoll;
        this.performRound();
      } else {
        this.attackRoll = null;
        this.defenseRoll = null;
      }
    });
  }

  closeDialog(): void {
    this.confirmDialogRef = this.dialog.open(this.confirmDialog);
    this.confirmDialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.dialogRef.close();
      }
    });
  }

  performRound() {
    if (this.attackRoll === null || this.defenseRoll === null) {
      this.openInputDialog(); // Újra megnyitjuk a dialógust, ha az értékek nem lettek megadva
      return;
    }

    this.executeRound(
      this.attackRoll,
      this.defenseRoll,
      this.selectedFirst.name,
      this.selectedSecond.name,
      this.selectedFirst.attack,
      this.selectedSecond.attack,
      this.selectedFirst.defense || 0,
      this.selectedSecond.defense || 0
    );

    if (this.hp2 <= 0 || this.hp1 <= 0) {
      this.result = this.getBattleResult();
    } else {
      this.round++;
      this.attackRoll = null;
      this.defenseRoll = null;
      this.openInputDialog(); // Újra megnyitjuk a dialógust a következő kör előtt
    }
  }

  executeRound(attackModifier: number, defenseModifier: number, name1: string, name2: string, attack1: number, attack2: number, defense1: number, defense2: number) {
    const eventLog: string[] = [];
    let damage = 0;

    if (this.isFirstAttacking) {
      damage = this.calculateDamage(attack1, attackModifier, defenseModifier);
      this.hp2 -= damage;
      this.battleLog.push(`${name1} üt ${damage.toFixed(1)} sebzést; ${name2} maradt ${Math.max(this.hp2, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
    } else {
      damage = this.calculateDamage(attack2, attackModifier, defenseModifier);
      this.hp1 -= damage;
      this.battleLog.push(`${name2} üt ${damage.toFixed(1)} sebzést; ${name1} maradt ${Math.max(this.hp1, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
    }

    this.isFirstAttacking = !this.isFirstAttacking;
  }

  calculateDamage(baseAttack: number, attackModifier: number, defenseModifier: number): number {
    return Math.max((baseAttack * attackModifier) - defenseModifier, 0);
  }

  getBattleResult(): string {
    if (this.hp1 > 0) {
      return `${this.selectedFirst.name} győzött!`;
    } else if (this.hp2 > 0) {
      return `${this.selectedSecond.name} győzött!`;
    } else {
      return "Döntetlen!";
    }
  }

  onevsone(hp1: number, hp2: number, attack1: number, attack2: number, defense1: number, defense2: number, name1: string, name2: string) {
    const battleLog: string[] = [];
    let isFirstAttacking = Math.random() < 0.5;

    while (hp1 > 0 && hp2 > 0) {
      let attackModifier = 1 + (Math.random() * 0.2 - 0.1);
      let defenseModifier = isFirstAttacking ? defense2 : defense1;
      const eventLog: string[] = [];

      if (Math.random() < 0.1) {
        attackModifier *= 2;
        eventLog.push('kritikus ütés');
      }

      if (Math.random() < 0.1) {
        attackModifier = 0;
        eventLog.push('melléütés');
      }

      if (Math.random() < 0.1) {
        defenseModifier *= 0.5;
        eventLog.push('botlás');
      }

      if (isFirstAttacking) {
        const damage = this.calculateDamage(attack1, attackModifier, defenseModifier);
        hp2 -= damage;
        battleLog.push(`${name1} üt ${damage.toFixed(1)} sebzést; ${name2} maradt ${Math.max(hp2, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      } else {
        const damage = this.calculateDamage(attack2, attackModifier, defenseModifier);
        hp1 -= damage;
        battleLog.push(`${name2} üt ${damage.toFixed(1)} sebzést; ${name1} maradt ${Math.max(hp1, 0).toFixed(1)} HP (${eventLog.join(', ')})`);
      }

      isFirstAttacking = !isFirstAttacking;
    }

    const result = this.getBattleResult();

    return { battleLog, result };
  }

  resetSelection() {
    this.mode = null;
    this.selectedFirst = null;
    this.selectedSecond = null;
    this.result = '';
    this.battleLog = [];
    this.round = 1;
    this.attackRoll = null;
    this.defenseRoll = null;
  }
}
