import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Character {
  name: string;
  race: string;
  class: string;
  hp: number;
  attack: number;
  defense: number;
  story: string;
}

@Component({
  selector: 'app-karakterek',
  templateUrl: './karakterek.component.html',
  styleUrls: ['./karakterek.component.scss']
})
export class KarakterekComponent implements OnInit {
  displayedColumns: string[] = ['name', 'race', 'class', 'hp', 'attack', 'defense', 'story'];
  private itemsSubject = new BehaviorSubject<Character[]>([]);
  characters$: Observable<Character[]> = this.itemsSubject.asObservable();
  dataSource = new MatTableDataSource<Character>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.afs.collection<Character>('characters').valueChanges().subscribe(
      characters => {
        this.dataSource.data = characters; // Directly update the MatTableDataSource
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching characters:', error);
      }
    );
  }
}