import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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
  selector: 'app-targy',
  templateUrl: './targy.component.html',
  styleUrls: ['./targy.component.scss']
})
export class TargyComponent implements OnInit {
  selectedImage: File | null = null;

  createfrom = new FormGroup({
    name: new FormControl(''),
    attackmodifier: new FormControl(0),
    defensemodifier: new FormControl(0),
    hpmodifier: new FormControl(0),
    price: new FormControl(0),
    minimumlevel: new FormControl(0),
    picture: new FormControl(''), // Initially empty, will store the image URL
    story: new FormControl('')
  });

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

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
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  items: Item[] = [];

  async onSubmit() {
    if (this.selectedImage) {
      try {
        const filePath = `item_images/${Date.now()}_${this.selectedImage.name}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, this.selectedImage).snapshotChanges().toPromise();
        const url = await fileRef.getDownloadURL().toPromise();
        const pictureControl = this.createfrom.get('picture');
            if (pictureControl) {
              pictureControl.setValue(url); // Only set if control exists
            }
      } catch (error) {
        console.error('Error during image upload:', error);
        return;  // Exit if the upload fails
      }
    }
    this.addNewItem();
  }
  
  addNewItem() {
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