import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';
import { Character, CharacterItem } from '../krealas/krealas.component';


@Component({
  selector: 'app-targyak',
  templateUrl: './targyak.component.html',
  styleUrls: ['./targyak.component.scss']
})
export class TargyakComponent implements OnInit {
  items: Observable<any[]> = EMPTY;
  characters: Character[] = [];  // Array to hold character data
  selectedCharacter: Character | null = null;
  characterIds: Map<string, string> = new Map();  // Map to hold character names to Firestore document IDs


  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.items = this.afs.collection('items').valueChanges();
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
  }

  buyItem(item: any) {
    if (!this.selectedCharacter) {
      console.error('No character selected!');
      return;
    }

    const characterId = this.characterIds.get(this.selectedCharacter.name);
    if (!characterId) {
      console.error('No ID found for this character.');
      return;
    }

    const newItem: CharacterItem = {
      name: item.name,
      attackModifier: item.attackmodifier,
      defenseModifier: item.defensemodifier,
      hpModifier: item.hpmodifier,
      picture: item.picture
    };
  
    // Adding the new item to the character's items array
    const itemsUpdate = this.selectedCharacter.items ? [...this.selectedCharacter.items, newItem] : [newItem];
    this.afs.collection('characters').doc(characterId).update({ items: itemsUpdate })
      .then(() => console.log('Item added to character successfully'))
      .catch(error => console.error('Error adding item to character: ', error));
  }
}

