import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-targyak',
  templateUrl: './targyak.component.html',
  styleUrls: ['./targyak.component.scss']
})
export class TargyakComponent implements OnInit {
  items: Observable<any[]> = EMPTY;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.items = this.firestore.collection('items').valueChanges();
  }
}