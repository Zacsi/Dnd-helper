import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, filter } from 'rxjs/operators';

interface MapCell {
    x: number;
    y: number;
    character: Character | null;
}

interface Character {
    id: number;
    name: string;
    position: { x: number; y: number };
    type: 'hero' | 'enemy';
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
    private mapState: MapCell[][] = [];


  constructor(private firestore: AngularFirestore) {}

  saveMapState(mapId: string, map: MapCell[][]): Promise<void> {
    const cells = map.flat().map(cell => ({
      x: cell.x,
      y: cell.y,
      character: cell.character ? {
        id: cell.character.id,
        name: cell.character.name,
        type: cell.character.type,
        position: cell.character.position
      } : null
    }));

    return this.firestore.collection('maps').doc(mapId).set({ cells });
  }
  setMapState(state: MapCell[][]) {
    this.mapState = state;
  }

  getMapState(mapId: string): Observable<{ cells: MapCell[] }> {
    return this.firestore.collection<{ cells: MapCell[] }>('maps').doc(mapId).valueChanges().pipe(
      map(data => data ? data : { cells: [] }), // Ensure data is never undefined
      tap({
        next: data => {
          console.log('Map data loaded successfully', data);
        },
        error: error => {
          console.error('Error loading map data:', error);
        }
      }),
      catchError(error => {
        console.error('Failed to fetch map data:', error);
        return of({ cells: [] }); // Provide a default empty structure if there's an error
      })
    );
  }
  
}
