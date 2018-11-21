import { Component, Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie';

// @Component({
//  providers: [AngularFireAuth],
//   template:''

// })

@Injectable()
export class AuthService {

  // constructor(public afAuth: AngularFireAuth, private _cookieService: CookieService) { }
  constructor(public afAuth: AngularFireAuth, private _cookieService: CookieService) { }
  loginProvider;
  loginWith(loginBy: string) {
    if (loginBy === 'google') {
      this.loginProvider = new firebase.auth.GoogleAuthProvider();
      // this.loginProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // this.loginProvider.addScope('https://www.googleapis.com/auth/admin.directory.device.mobile.readonly');

    } else if (loginBy === 'fb') {
      this.loginProvider = new firebase.auth.FacebookAuthProvider();
    } else if (loginBy === 'github') {
      this.loginProvider = new firebase.auth.GithubAuthProvider();
    }

    return this.afAuth.auth.signInWithPopup(this.loginProvider);
  }

  // loginWith(loginBy: string) {
  //   this._cookieService.put('ut', 'user');

  //   sessionStorage.setItem('userToken', this._cookieService.get('ut'));
  //   return new Promise((resolve, reject) => {
  //     // Do some async stuff

  //     // If async opp successful
  //     resolve(this._cookieService.get('ut'));

  //     // If async opp fails
  //     reject();
  //   });
  // }

  logout() {
    sessionStorage.removeItem('userToken');
    this._cookieService.remove('ut');
    this._cookieService.remove('up');
    return this.afAuth.auth.signOut();
  }


  isAuthorized() {
    // return new Promise((resolve, reject) => {
      // Do some async stuff

      // If async opp successful
      // resolve(this._cookieService.get('ut'));

      // If async opp fails
      // reject();
    // });

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          return false;
        } else {
          return true;
        }
      }
    );
  }

}
