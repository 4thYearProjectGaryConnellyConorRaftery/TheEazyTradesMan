import { Component, OnInit } from '@angular/core';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

/**
 * WorkerConfirmationComponent is the components that gets rendered for
 * the Worker whenever they make an action that requires some sort of
 * confirmation message to be shown to them. This confirmation message
 * can be set at runtime depending on the action that is being confirmed.
 */
@Component({
  selector: 'app-worker-confirmation',
  templateUrl: './worker-confirmation.component.html',
  styleUrls: ['./worker-confirmation.component.css']
})
export class WorkerConfirmationComponent implements OnInit {

  message: string;

  /**
   * Null constructor
   * @param authService 
   * @param service 
   * @param router 
   */
  constructor(private authService: AuthService, private service: WorkerConfirmationService, private router: Router) { }

  /**
   * Get a handle on the current confirmation message.
   */
  ngOnInit() {
    this.message = this.service.getConfirmationMessage();
  }

  /**
   * When the user clicks the "OK" button, redirect them to the listJobsWorker
   * component.
   */
  ok(): void{
    this.router.navigate(["/listJobsWorker"]);
  }


   /**
    * When the user click on the "List Jobs" navigation button, redirect them
    * to listJobsWorker component.
    */
  navListJobs(): void{
    this.router.navigate(["/listJobsWorker"]);
  }

  /**
   * When the user clicks "View Profile" navigation button, redirect them to
   * the viewProfile component.
   */
   navMyProfile(): void{
    this.router.navigate(["/viewProfile"]);
  }

  /**
   * When the user clicks "Edit Profile" navigation button, redirect them to
   * the editProfile component.
   */
   navEditProfile(): void{
    this.router.navigate(["/editProfile"]);
  }

  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myrequests component.
   */
  navMyRequests(): void{
    this.router.navigate(["/myrequests"]);
  }

  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. Change the local
   *  storage to remove access for site navigation.
   */
   logout(){
    this.authService.doLogout()
    .then((res) => {
      //this.location.back(); //login
       localStorage.setItem('WorkerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  // End Navigation.

}
