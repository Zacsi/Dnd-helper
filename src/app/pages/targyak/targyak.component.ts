import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
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
  isFlipped?: boolean;  // Add isFlipped property
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

  isTableView = true;  // Property to track current view

  constructor(private afs: AngularFirestore, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.afs.collection<Item>('items').valueChanges().subscribe(
      items => {
        items.forEach(item => item.isFlipped = false);
        this.dataSource.data = items; // Directly update the MatTableDataSource
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges(); // Trigger change detection

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

  toggleFlip(item: Item) {
    item.isFlipped = !item.isFlipped;
  }
  toggleView() {
    this.isTableView = !this.isTableView;
    this.cdr.detectChanges(); // Trigger change detection after toggling view

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

