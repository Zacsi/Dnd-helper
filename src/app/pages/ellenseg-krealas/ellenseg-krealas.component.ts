import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Enemy {
  name: string;
  race: string;
  class: string;
  hp: number;
  attack: number;
  defense: number;
  story: string;
}

@Component({
  selector: 'app-ellenseg-krealas',
  templateUrl: './ellenseg-krealas.component.html',
  styleUrls: ['./ellenseg-krealas.component.scss']
})
export class EllensegKrealasComponent implements OnInit {

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
    this.fetchEnemies();
  }
  
  fetchEnemies() {
    this.afs.collection<Enemy>('Enemies').valueChanges().subscribe(Enemies => {
      this.Enemies = Enemies;
    }, error => {
      console.error('Error fetching Enemies: ', error);
    });
  }


Enemies: Enemy[] = [];

onSubmit() {
  const enemy = this.createfrom.value;
  this.afs.collection('Enemies').add(enemy)
    .then(() => {
      console.log('Enemy added successfully');
            this.fetchEnemies();
    })
    .catch(error => {
      console.error('Error adding enemy: ', error);
    });
  this.createfrom.reset();
}
}




