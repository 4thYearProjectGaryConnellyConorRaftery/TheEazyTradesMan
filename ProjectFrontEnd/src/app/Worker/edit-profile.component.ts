import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { WorkerConfirmationService } from '../Services/workerConfirmation.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private workerService: WorkersService, 
  private confirmationService: WorkerConfirmationService, 
  private router: Router, 
  private authService: AuthService) { }

  getRequests: Worker;
  message: string = "";
  isWorker: boolean = false;
  /*
   * Create an empty worker object for the user to fill out.
   */
  worker: Worker;/* ={
    id: localStorage.getItem('WorkerID'),
    firstName: "",
    secondName: "",
    address: "",
    trade: "",
    rating: "", // This will need to be calculated later rather than setting the value here.
    phoneNumber: "",
    email:"",
    website: "",
    firebaseUid: "",
    jobsRequested: "",
    jobsAccepted: ""
    //photoPath: null
  }
  */

  ngOnInit() {

    if(localStorage.getItem('WorkerID') == "x"){
      this.message = "Only logged in workers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else{
    this.isWorker = true;

    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
      this.worker = data;
      console.log("Got worker ---> " + this.worker.firstName)
    })
    
    }
   
 
  }



   /*
    * When the user clicks update.
    */
   update(updateWorker: Worker): void{

    this.workerService.putWorker(updateWorker).subscribe(data => {
      console.log(data)

      this.confirmationService.setConfirmationMessage("Your profile has been updated!");
      this.router.navigate(["/workerConfirmation"]);
    })

    /*
     * Create an empty worker object for the user to fill out.
     */
//    this.worker.rating = "";  // Just hardcode the rating for now.
    /*
     * Get a handle on the worker we are updating.
     */
 //   this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
 //   this.getRequests = data;
 //   updateWorker.jobsRequested = this.getRequests.jobsRequested
 //   updateWorker.firebaseUid = this.getRequests.firebaseUid;
 //   updateWorker.jobsAccepted = this.getRequests.jobsAccepted;
 //   updateWorker.rating = this.getRequests.rating;
    /*
    this.worker.jobsRequested = this.getRequests.jobsRequested;
    this.worker.firebaseUid = this.getRequests.firebaseUid;
    this.worker.jobsAccepted = this.getRequests.jobsAccepted;
    this.worker.rating = this.getRequests.rating;
    */

     /*
      * Send the updated worker through the serverside to be updated on the database.
      */
  //   this.workerService.putWorker(updateWorker).subscribe((data: Worker) =>{
  //   console.log(data);
  //  console.log(updateWorker.jobsRequested)
  //   this.confirmationService.setConfirmationMessage("Your profile has been updated!");
  //  this.router.navigate(["/workerConfirmation"]);
  //  });

  //});
  
   
  }

  // Navigation.
  navListJobs(): void{
    this.router.navigate(["/listJobsWorker"]);
  }

   navMyProfile(): void{
    this.router.navigate(["/viewProfile"]);
  }

   navEditProfile(): void{
    this.router.navigate(["/editProfile"]);
  }

  navMyRequests(): void{
    this.router.navigate(["myrequests"]);
  }

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
