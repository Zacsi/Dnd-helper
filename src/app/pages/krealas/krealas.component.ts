import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Character {
  name: string;
  race: string;
  class: string;
  hp: number;
  attack: number;
  defense: number;
  story: string;
}

@Component({
  selector: 'app-krealas',
  templateUrl: './krealas.component.html',
  styleUrls: ['./krealas.component.scss']
})
export class KrealasComponent implements OnInit {

  createfrom = new FormGroup({
    name: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    hp: new FormControl(0),
    attack: new FormControl(0),
    defense: new FormControl(0),
    story: new FormControl('')
  });

  constructor(private afs: AngularFirestore) { }

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


characters: Character[] = [];

onSubmit() {
  const character = this.createfrom.value;
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




