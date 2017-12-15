import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  user: User;
  uid: any;
  constructor(private db: AngularFirestore) {

  }

  save(user: firebase.User) {
    this.uid = user.uid;
    this.db.collection('users')
      .doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        isAdmin: true

      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
      const userResult: AngularFirestoreDocument<User> =  this.db.doc('users/' + user.uid);
      const userData: Observable<User> = userResult.valueChanges();
      //userData.subscribe();
      userData.forEach( userRec => {
        console.log('user ', userRec);
        this.user = userRec;

      }
      );

  }

  getCurrentUser() {
    return this.user;
  }
  getUser(): Observable<User> {
    if ( !this.uid) {
      return null;
    }
    const userResult: AngularFirestoreDocument<User> =  this.db.doc('users/' + this.uid);
    const userChangeObservable: Observable<User> = userResult.valueChanges();
    return userChangeObservable;
  }
}
