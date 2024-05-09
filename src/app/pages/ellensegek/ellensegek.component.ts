import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Enemy {
  name: string;
  race: string;
  class: string;
  hp: number;
  attack: number;
  defense: number;
  story: string;
}

@Component({
  selector: 'app-ellensegek',
  templateUrl: './ellensegek.component.html',
  styleUrls: ['./ellensegek.component.scss']
})


export class EllensegekComponent implements OnInit {
  displayedColumns: string[] = ['name', 'race', 'class', 'hp', 'attack', 'defense', 'story'];
  private itemsSubject = new BehaviorSubject<Enemy[]>([]);
  enemies$: Observable<Enemy[]> = this.itemsSubject.asObservable();
  dataSource = new MatTableDataSource<Enemy>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.afs.collection<Enemy>('Enemies').valueChanges().subscribe(
      enemies => {
        this.dataSource.data = enemies; // Directly update the MatTableDataSource
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching enemies:', error);
      }
    );
  }
}
