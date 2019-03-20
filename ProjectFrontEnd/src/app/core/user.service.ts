/**
 * Imports
 */
import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * This class is used to get a handle on the current user of the application, 
 * along with updating the current user on each change of page navigation.
 */
@Injectable()
export class UserService {
  /**
   * Null constructor with paramaters
   * @param db 
   * @param afAuth 
   */
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
  }

  /**
   * Gets handle on current user and checks if a user is logged in via using Promise.
   */
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  /**
   * Updates current user on every page change.
   * @param value 
   */
  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
