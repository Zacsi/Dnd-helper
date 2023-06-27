import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dnd-helper';
  showDiv: boolean = true;  // By default, the div will be visible

  toggleDiv(): void {
    this.showDiv = !this.showDiv;  // Toggles between true and false
  }
}
