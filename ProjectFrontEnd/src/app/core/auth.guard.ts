import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../core/user.service';

/**
 * The router will redirect back to the root page on a full
 *  browser refresh - even if the user is authenticated.
 *  This class takes a different approach to the router guard
 *  that takes the first emitted value from the Observable
 *  and maps it to a boolean. Then we catch unauthenticated users and redirect them.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Null constructor used for accessing needed variables.
   * @param afAuth 
   * @param userService 
   * @param router 
   */
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  /**
   * The new auth guard will wait for a value to be emitted before redirecting.
   */
  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/user']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
}
