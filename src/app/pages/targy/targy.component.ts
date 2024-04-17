import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Item {
  name: string;
  attackmodifier: number;
  defensemodifier: number;
  hpmodifier: number;
  price: number;
  minimumlevel: number;
  //picture: ImageData?;
  story: string;
}

@Component({
  selector: 'app-targy',
  templateUrl: './targy.component.html',
  styleUrls: ['./targy.component.scss']
})
export class TargyComponent implements OnInit {

  createfrom = new FormGroup({
    name: new FormControl(''),
    attackmodifier: new FormControl(0),
    defensemodifier: new FormControl(0),
    hpmodifier: new FormControl(0),
    price: new FormControl(0),
    minimumlevel: new FormControl(0),
    //picture: new FormControl(?),
    story: new FormControl('')
  });

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.fetchItems();
  }
  
  fetchItems() {
    this.afs.collection<Item>('items').valueChanges().subscribe(items => {
      this.items = items;
    }, error => {
      console.error('Error fetching items: ', error);
    });
  }


  items: Item[] = [];

onSubmit() {
  const item = this.createfrom.value;
  this.afs.collection('items').add(item)
    .then(() => {
      console.log('Item added successfully');
            this.fetchItems();
    })
    .catch(error => {
      console.error('Error adding item: ', error);
    });
  this.createfrom.reset();
}
}