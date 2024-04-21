import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap } from 'rxjs/operators';
import { Observable,from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  sendMessage(chatId: string, messageText: string) {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user && user.email) {  // Ensure there is a logged-in user with an email
          const timestamp = new Date();
          this.firestore.collection(`chats/${chatId}/messages`).add({
            messageText,
            senderId: user.email,  // Use user's email as senderId
            timestamp
          }).then(() => {
            console.log("Message sent");
          }).catch(error => {
            console.error("Error sending message:", error);
          });
        } else {
          throw new Error('No authenticated user or email unavailable');
        }
      })
    ).subscribe();  // Handle the observable to perform the action
  }

  getMessages(chatId: string) {
    return this.firestore.collection(`chats/${chatId}/messages`, ref => ref.orderBy('timestamp', 'asc')).valueChanges();
  }
  clearHistory(chatId: string) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const ref = this.firestore.collection(`chats/${chatId}/messages`);
          return ref.get().pipe(
            switchMap(querySnapshot => {
              // Create a batch operation
              const batch = this.firestore.firestore.batch();
              querySnapshot.forEach(doc => {
                batch.delete(doc.ref);
              });
              // Commit the batch
              return from(batch.commit());
            })
          );
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }
}
