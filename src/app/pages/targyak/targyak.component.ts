import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';
import { Character, CharacterItem } from '../krealas/krealas.component';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Item {
  name: string;
  attackmodifier: number;
  defensemodifier: number;
  hpmodifier: number;
  price: number;
  minimumlevel: number;
  picture?: string;
  story: string;
}

@Component({
  selector: 'app-targyak',
  templateUrl: './targyak.component.html',
  styleUrls: ['./targyak.component.scss']
})
export class TargyakComponent implements OnInit {
  displayedColumns: string[] = ['name', 'attackmodifier', 'defensemodifier', 'hpmodifier', 'price', 'minimumlevel', 'picture', 'story', 'action'];
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  characters: Character[] = [];  // Array to hold character data
  selectedCharacter: Character | null = null;
  characterIds: Map<string, string> = new Map();  // Map to hold character names to Firestore document IDs


  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.afs.collection<Item>('items').valueChanges().subscribe(
      items => {
        this.dataSource.data = items; // Directly update the MatTableDataSource
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching items:', error);
      }

    );
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

