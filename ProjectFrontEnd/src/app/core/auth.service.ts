import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * The methods available on AngularFireAuth.auth all return promises so we can use
 *  then and catch to deal with the success and error states respectively.
 */
@Injectable()
export class AuthService {

  /**
   * Null constructor used for accessing angular fire authentication.
   * @param afAuth
   */
  constructor(
   public afAuth: AngularFireAuth
 ){}

 /**
  * Provides a pop up for Facebook sign in via Firebase authentication.
  */
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  /**
  * Provides a pop up for Twitter sign in via Firebase authentication. (Not in use but works)
  */
  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  /**
  * Provides a pop up for Google sign in via Firebase authentication. (Not in use but works)
  */
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  /**
   * We use createUserWithEmailAndPassword and signInWithEmailAndPassword 
   * here since we’re setting up email/password authentication. 
   * @param value 
   */
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  /**
   * We use createUserWithEmailAndPassword and signInWithEmailAndPassword 
   * here since we’re logging in with email/password authentication.
   * @param value 
   */
  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  /**
   * Log out current user when Promise is created via Firebase authentication.
   */
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }


}
