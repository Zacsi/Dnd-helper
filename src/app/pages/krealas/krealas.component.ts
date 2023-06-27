import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

interface Character {
  charactername: string;
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
    charactername: new FormControl(''),
    race: new FormControl(''),
    class: new FormControl(''),
    hp: new FormControl(0),
    attack: new FormControl(0),
    defense: new FormControl(0),
    story: new FormControl('')
  });

  constructor() { }

ngOnInit(): void {
}


characters: Character[] = [];

onSubmit() {
  const formValue = this.createfrom.value;
  const character: Character = {
    charactername: formValue.charactername || '',
    race: formValue.race || '',
    class: formValue.class || '',
    hp: formValue.hp ? +formValue.hp : 0,
    attack: formValue.attack ? +formValue.attack : 0,
    defense: formValue.defense ? +formValue.defense : 0,
    story: formValue.story || '',
  };
  this.characters.push(character);
  this.createfrom.reset();
}
}



