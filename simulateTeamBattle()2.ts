simulateTeamBattle() {
  if (this.selectedCharacters.length === 0 || this.selectedEnemies.length === 0) {
    this.result = "Kérem válassza ki a csapatokat!";
    return;
  }

  let allParticipants = [...this.selectedCharacters, ...this.selectedEnemies];
  let rounds = 3; // Például 3 nagy kör
  this.battleLog = [];

  for (let i = 0; i < rounds; i++) {
    this.battleLog.push(`Nagy kör ${i + 1} kezdődik...`);

    // Minden karakter cselekszik
    allParticipants.forEach(participant => {
      if (participant.hp > 0) {
        let target = this.selectRandomTarget(participant, allParticipants);
        if (target) {
          this.attack(participant, target);
        }
      }
    });

    // Kisebb kör: egy véletlenszerű támadó cselekszik
    let activeParticipants = allParticipants.filter(p => p.hp > 0);
    if (activeParticipants.length > 0) {
      let randomAttacker = activeParticipants[Math.floor(Math.random() * activeParticipants.length)];
      let target = this.selectRandomTarget(randomAttacker, allParticipants);
      if (target) {
        this.battleLog.push(`Kisebb kör: ${randomAttacker.name} extra támadást indít...`);
        this.attack(randomAttacker, target);
      }
    }
  }

  // Ellenőrizzük, van-e győztes
  this.checkForWinner();
}

selectRandomTarget(attacker: any, participants: any[]): any {
  // Kiválaszt egy véletlenszerű célpontot a támadónak, kizárva önmagát
  let possibleTargets = participants.filter(p => p.hp > 0 && p !== attacker);
  if (possibleTargets.length > 0) {
    return possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
  }
  return null;
}

attack(attacker: any, target: any): void {
  // Kiszámítja a sebzést, és naplózza a támadást
  let damage = Math.max(attacker.attack - target.defense, 1); // Egyszerűsített sebzés logika
  target.hp -= damage;
  this.battleLog.push(`${attacker.name} támad ${target.name} ellen, ${damage} sebzést okozva. ${target.name} maradt HP: ${Math.max(target.hp, 0)}.`);
}

checkForWinner() {
  let survivors = [...this.selectedCharacters, ...this.selectedEnemies].filter(p => p.hp > 0);
  if (survivors.every(p => this.selectedCharacters.includes(p))) {
    this.result = "A játékosok csapata győzött!";
  } else if (survivors.every(p => this.selectedEnemies.includes(p))) {
    this.result = "Az ellenségek csapata győzött!";
  } else {
    this.result = "A harc még folytatódik...";
  }
}
