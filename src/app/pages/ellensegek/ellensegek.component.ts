import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-ellensegek',
  templateUrl: './ellensegek.component.html',
  styleUrls: ['./ellensegek.component.scss']
})
export class EllensegekComponent implements OnInit {
  enemies: Observable<any[]> = EMPTY;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.enemies = this.firestore.collection('Enemies').valueChanges();
  }
}
