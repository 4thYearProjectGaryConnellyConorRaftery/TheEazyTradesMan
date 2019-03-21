import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

/**
 * This class is used for editing the workers profile and updating the new details within the MongoDB.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  /**
   * Null constructor
   * @param workerService 
   * @param confirmationService 
   * @param router 
   * @param authService 
   */
  constructor(private workerService: WorkersService,
    private confirmationService: WorkerConfirmationService,
    private router: Router,
    private authService: AuthService) { }

  getRequests: Worker;
  message: string = "";
  isWorker: boolean = false;

  /**
   * Create an empty worker object for the user to fill out.
   */
  worker: Worker;

    /**
     * If the user is a Worker, then let them see the data.
     */
  ngOnInit() {
    if (localStorage.getItem('WorkerID') == "x") {
      this.message = "Only logged in workers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else {
      this.isWorker = true;

      /**
       * Get handle on worker ID via local storage.
       */
      this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
        this.worker = data;
        console.log("Got worker ---> " + this.worker.firstName)
      })
    }
  }

  /**
   * When the user clicks update. Save the new worker object with new worker details to MongoDB.
   * Notify the user of the update.
   */
  update(updateWorker: Worker): void {

    this.workerService.putWorker(updateWorker).subscribe(data => {
      console.log(data)

      this.confirmationService.setConfirmationMessage("Your profile has been updated!");
      this.router.navigate(["/workerConfirmation"]);
    })

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

}
