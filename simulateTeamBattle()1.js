simulateTeamBattle() {
  if (!this.selectedCharacters.length || !this.selectedEnemies.length) {
    this.result = "Kérjük, válasszon ki karaktereket és ellenségeket a csatahoz!";
    return;
  }

  // Kezdő állapotok beállítása
  let characters = this.selectedCharacters.map(char => ({ ...char, hp: char.hp }));
  let enemies = this.selectedEnemies.map(enemy => ({ ...enemy, hp: enemy.hp }));
  this.battleLog = [];
  let activeParticipants = [...characters, ...enemies];

  // Nagy kör kezdete
  while (characters.some(char => char.hp > 0) && enemies.some(enemy => enemy.hp > 0)) {
    for (let participant of activeParticipants) {
      if (participant.hp <= 0) continue; // Ha már kiesett, nem cselekszik

      // Cél kiválasztása
      let targets = participant.type === 'character' ? enemies : characters;
      let target = targets.find(t => t.hp > 0); // Az első élő célpont
      if (!target) continue; // Ha nincs több célpont

      // Támadás logikája
      let damage = Math.max(participant.attack - target.defense, 0);
      target.hp -= damage;
      this.battleLog.push(`${participant.name} üt ${damage} sebzést; ${target.name} maradt ${Math.max(target.hp, 0)} HP`);

      // Ellenőrizzük a csata állását
      if (!targets.some(t => t.hp > 0)) break; // Ha mindenki kiesett az egyik oldalon
    }

    // Itt jönne a kisebb kör, ahol egy kiemelt cselekvés történik
    this.performSpecialAction(activeParticipants);
  }

  // Csata vége
  if (characters.some(char => char.hp > 0)) {
    this.result = "A karakterek csapata győzött!";
  } else {
    this.result = "Az ellenségek csapata győzött!";
  }
}

performSpecialAction(participants) {
  // Véletlenszerűen választ egy aktív résztvevőt a különleges cselekedetre
  let active = participants.filter(p => p.hp > 0);
  if (!active.length) return;

  let specialParticipant = active[Math.floor(Math.random() * active.length)];
  let isHealing = Math.random() < 0.5; // Döntés, hogy gyógyít vagy erős támadást indít

  if (isHealing) {
    // Gyógyítás esete
    specialParticipant.hp += 30; // Gyógyít 30 HP-t
    this.battleLog.push(`${specialParticipant.name} gyógyít magán 30 HP-t`);
  } else {
    // Erős támadás
    let targets = specialParticipant.type === 'character' ? this.selectedEnemies : this.selectedCharacters;
    let target = targets.find(t => t.hp > 0);
    if (!target) return;

    let damage = specialParticipant.attack * 2; // Dupla sebzés
    target.hp -= damage;
    this.battleLog.push(`${specialParticipant.name} erős támadást indít, ${damage} sebzést okozva ${target.name}-nek`);
  }
}
