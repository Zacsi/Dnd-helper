import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Character } from '../krealas/krealas.component'; // Adjust path as necessary

@Component({
  selector: 'app-myhero',
  templateUrl: './myhero.component.html',
  styleUrls: ['./myhero.component.scss']
})
export class MyheroComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  characterIds: Map<string, string> = new Map();
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

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.editForm.patchValue(character);
  }

  onSave() {
    const characterId = this.selectedCharacter ? this.characterIds.get(this.selectedCharacter.name) : null;
    if (characterId) {
      this.afs.collection('characters').doc(characterId).update(this.editForm.value)
        .then(() => console.log('Character updated successfully'))
        .catch(error => console.error('Error updating character: ', error));
    } else {
      console.error('No ID found for this character.');
    }
  }
  onDelete() {
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
  }
  
}
