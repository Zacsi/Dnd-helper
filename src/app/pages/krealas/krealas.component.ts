import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Character {
  name: string;
  race: string;
  class: string;
  hp: number;
  attack: number;
  defense: number;
  story: string;
  items: CharacterItem[];
}
export interface CharacterItem {
  name: string;
  attackModifier: number;
  defenseModifier: number;
  hpModifier: number;
  picture: string;  // URL to the image of the item

}

@Component({
  selector: 'app-krealas',
  templateUrl: './krealas.component.html',
  styleUrls: ['./krealas.component.scss']
})
export class KrealasComponent implements OnInit {
  characters: Character[] = [];
  createfrom: FormGroup;

 // In your constructor:
 constructor(private afs: AngularFirestore, private fb: FormBuilder) {
  this.createfrom = this.fb.group({
    name: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    hp: new FormControl(0),
    attack: new FormControl(0),
    defense: new FormControl(0),
    story: new FormControl(''),
    items: this.fb.array([])  // Initialize as an empty FormArray
  });
}

ngOnInit(): void {
  this.fetchCharacters();
}

fetchCharacters() {
  this.afs.collection<Character>('characters').valueChanges().subscribe(characters => {
    this.characters = characters;
  }, error => {
    console.error('Error fetching characters: ', error);
  });
}

get items(): FormArray {
  return this.createfrom.get('items') as FormArray;
}

addItem(): void {
  this.items.push(this.fb.group({
    name: '',
    attackModifier: 0,
    defenseModifier: 0,
    hpModifier: 0,
    picture: ''
  }));
}

onSubmit() {
  const character: Character = this.createfrom.value as Character;
  this.afs.collection('characters').add(character)
    .then(() => {
      console.log('Character added successfully');
            this.fetchCharacters();
    })
    .catch(error => {
      console.error('Error adding character: ', error);
    });
  this.createfrom.reset();
}
}




