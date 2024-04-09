import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-karakterek',
  templateUrl: './karakterek.component.html',
  styleUrls: ['./karakterek.component.scss']
})
export class KarakterekComponent implements OnInit {
  characters: Observable<any[]> = EMPTY; // EMPTY is an observable that completes immediately

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.characters = this.firestore.collection('characters').valueChanges();
  }
}