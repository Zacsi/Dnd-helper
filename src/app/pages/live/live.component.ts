// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

interface Character {
  id: number;
  name: string;
  position: { x: number; y: number };
  type: 'hero' | 'enemy'; // Added to differentiate between heroes and enemies

}

interface MapCell {
  x: number;
  y: number;
  character: Character | null;
}

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  mapSize = 20;
  map: MapCell[][] = [];
  characters: Character[] = [
    { id: 1, name: 'Hero', type: 'hero', position: { x: 0, y: 0 } }
  ];
  nextId = 2; // Start with ID 2 since 1 is taken
  newCharacterName: string = '';
  mapBackgroundUrl: string | ArrayBuffer | null = "assets/defaultbg.jpg"; // Set a default background

  messages: any[] = [];
  newMessage: string = '';
  chatId = 'defaultChatId'; // This should be dynamically set based on the chat context

  constructor(private chatService: ChatService) {    this.initializeGrid();}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mapBackgroundUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  initializeGrid(): void {
    for (let i = 0; i < this.mapSize; i++) {
      this.map[i] = [];
      for (let j = 0; j < this.mapSize; j++) {
        this.map[i][j] = { x: i, y: j, character: null };
      }
    }
    this.placeCharacters();
  }
  placeCharacters(): void {
    this.characters.forEach(char => {
      this.map[char.position.x][char.position.y].character = char;
    });
  }
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  removeCharacter(cell: MapCell): void {
    if (cell.character !== null) {  // Explicit check for non-null
      // Assuming character IDs are unique, filter out the character to be removed
      this.characters = this.characters.filter(char => char.id !== cell.character!.id);
      cell.character = null;  // Clear the character from the cell
    }
  }
  

  addCharacter(type: 'hero' | 'enemy'): void {
    if (!this.newCharacterName.trim()) {
      alert('Please enter a name for the character.');
      return;
    }
    const emptyPosition = this.findEmptyCell();
    if (emptyPosition) {
      const newCharacter: Character = {
        id: this.nextId++,
        name: this.newCharacterName,
        position: emptyPosition,
        type: type
      };
      this.characters.push(newCharacter);
      this.map[newCharacter.position.x][newCharacter.position.y].character = newCharacter;
      this.newCharacterName = '';  // Reset for next input
    } else {
      alert('No empty cells available');
    }
  }
  addHero(): void {
    this.addCharacter('hero');
  }

  addEnemy(): void {
    this.addCharacter('enemy');
  }

  findEmptyCell(): { x: number; y: number } | undefined {
    for (let i = 0; i < this.mapSize; i++) {
      for (let j = 0; j < this.mapSize; j++) {
        if (!this.map[i][j].character) {
          return { x: i, y: j };
        }
      }
    }
    return undefined;
  }

  blurInput(event: Event): void {
    const target = event.target as HTMLInputElement; // Safely cast based on the context usage
    if (target && typeof target.blur === 'function') {
      target.blur();  // Only call blur if it's safe to do so
    }
  }
  

  onDrag(event: DragEvent, character: Character): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('character', JSON.stringify(character));
    }
  }
  
  onDrop(event: DragEvent, cell: MapCell): void {
    event.preventDefault();
    if (event.dataTransfer) {
      const data = event.dataTransfer.getData('character');
      if (data) {
        const character = JSON.parse(data) as Character;
        this.map[character.position.x][character.position.y].character = null;
        character.position.x = cell.x;
        character.position.y = cell.y;
        cell.character = character;
      }
    }
  }

  ngOnInit() {
    this.chatService.getMessages(this.chatId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.chatId, this.newMessage);
      this.newMessage = ''; // Clear message input after attempt to send
    }
  }
  clearChatHistory(): void {
    this.chatService.clearHistory(this.chatId).subscribe({
      next: () => {
        console.log('Chat history cleared successfully');
        this.messages = []; // Clear messages in the component state
      },
      error: (error) => {
        console.error('Failed to clear chat history', error);
      }
    });
  }
}
