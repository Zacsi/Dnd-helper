import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Character } from '../krealas/krealas.component'; // Adjust path as necessary
import { Enemy } from '../ellenseg-krealas/ellenseg-krealas.component'; // Adjust path as necessary

@Component({
  selector: 'app-myhero',
  templateUrl: './myhero.component.html',
  styleUrls: ['./myhero.component.scss']
})
export class MyheroComponent implements OnInit {
  mode: 'heroes' | 'enemies' = 'heroes'; // Mode switcher between heroes and enemies
  characters: Character[] = [];
  enemies: Enemy[] = [];
  selectedCharacter: Character | null = null;
  selectedEnemy: Enemy | null = null;
  characterIds: Map<string, string> = new Map();
  enemyIds: Map<string, string> = new Map();
  editForm = new FormGroup({
    name: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    hp: new FormControl(0),
    attack: new FormControl(0),
    defense: new FormControl(0),
    story: new FormControl('')
  });

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.fetchCharacters();
    this.fetchEnemies();
  }

  fetchCharacters() {
    this.afs.collection<Character>('characters', ref => ref.orderBy('name'))
      .snapshotChanges()
      .subscribe(actions => {
        this.characters = actions.map(a => a.payload.doc.data() as Character);
        actions.forEach(a => {
          this.characterIds.set(a.payload.doc.data().name, a.payload.doc.id);
        });
      });
  }
  fetchEnemies() {
    this.afs.collection<Enemy>('Enemies', ref => ref.orderBy('name'))
      .snapshotChanges()
      .subscribe(actions => {
        this.enemies = actions.map(a => a.payload.doc.data() as Enemy);
        actions.forEach(a => {
          this.enemyIds.set(a.payload.doc.data().name, a.payload.doc.id);
        });
      });
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.editForm.patchValue(character);
  }
  selectEnemy(enemy: Enemy) {
    this.selectedEnemy = enemy;
    this.editForm.patchValue(enemy);
  }

  onSave() {
    if (this.mode === 'heroes') {
      const characterId = this.selectedCharacter ? this.characterIds.get(this.selectedCharacter.name) : null;
      if (characterId) {
        this.afs.collection('characters').doc(characterId).update(this.editForm.value)
          .then(() => console.log('Character updated successfully'))
          .catch(error => console.error('Error updating character: ', error));
      } else {
        console.error('No ID found for this character.');
      }
    } else if (this.mode === 'enemies') {
      const enemyId = this.selectedEnemy ? this.enemyIds.get(this.selectedEnemy.name) : null;
      if (enemyId) {
        this.afs.collection('Enemies').doc(enemyId).update(this.editForm.value)
          .then(() => console.log('Enemy updated successfully'))
          .catch(error => console.error('Error updating enemy: ', error));
      } else {
        console.error('No ID found for this enemy.');
      }
    }
  }
  

  onDelete() {
    if (this.mode === 'heroes') {
    const characterId = this.selectedCharacter ? this.characterIds.get(this.selectedCharacter.name) : null;
    if (characterId) {
      this.afs.collection('characters').doc(characterId).delete()
        .then(() => {
          console.log('Character deleted successfully');
          this.selectedCharacter = null; // Optionally reset the selected character
          this.editForm.reset(); // Reset the form
          this.fetchCharacters(); // Refresh the list to reflect the deletion
        })
        .catch(error => {
          console.error('Error deleting character: ', error);
        });
    } else {
      console.error('No character selected or ID not found.');
    }
  } else if (this.mode === 'enemies') {
    const enemyId = this.selectedEnemy ? this.enemyIds.get(this.selectedEnemy.name) : null;
    if (enemyId) {
      this.afs.collection('Enemies').doc(enemyId).delete()
        .then(() => {
          console.log('Enemy deleted successfully');
          this.selectedEnemy = null; // Optionally reset the selected character
          this.editForm.reset(); // Reset the form
          this.fetchEnemies(); // Refresh the list to reflect the deletion
        })
        .catch(error => {
          console.error('Error deleting enemy: ', error);
        });
    } else {
      console.error('No enemy selected or ID not found.');
    }
  }
  }
  switchMode(mode: 'heroes' | 'enemies') {
    this.mode = mode;
  }
  
}
