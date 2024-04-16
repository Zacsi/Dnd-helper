import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dobokocka',
  templateUrl: './dobokocka.component.html',
  styleUrls: ['./dobokocka.component.scss']
})
export class DobokockaComponent implements OnInit {
  randomNumber: number = 0;
  selectedDice: number = 20; // Default kocka D20
  maxValue: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  updateMaxValue(newValue: number) {
    this.maxValue = newValue;
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * this.maxValue) + 1;
  }
}