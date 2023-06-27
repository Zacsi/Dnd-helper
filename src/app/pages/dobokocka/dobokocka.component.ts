import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dobokocka',
  templateUrl: './dobokocka.component.html',
  styleUrls: ['./dobokocka.component.scss']
})
export class DobokockaComponent implements OnInit {
  randomNumber: number= 0;

  constructor() { }

  ngOnInit(): void {
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * 20) + 1;
  }
}
