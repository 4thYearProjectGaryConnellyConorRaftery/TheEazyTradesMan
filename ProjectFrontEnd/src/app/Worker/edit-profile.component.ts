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
  worker: Worker ={
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

  ngOnInit() {
  //  this.worker.rating = "";
    //this.worker.jobsAccepted = "";
    //this.worker.jobsRequested = this.workerService
  //  this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
  //  this.getRequests = data;
  //  this.worker.jobsRequested = this.getRequests.jobsRequested;
  //  this.worker.firebaseUid = this.getRequests.firebaseUid;
  //  this.worker.jobsAccepted = this.getRequests.jobsAccepted;
  //  });

    
  }




   update(updateWorker: Worker): void{

      this.worker.rating = "";
    //this.worker.jobsAccepted = "";
    //this.worker.jobsRequested = this.workerService
    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
    this.getRequests = data;
    this.worker.jobsRequested = this.getRequests.jobsRequested;
    this.worker.firebaseUid = this.getRequests.firebaseUid;
    this.worker.jobsAccepted = this.getRequests.jobsAccepted;


     this.workerService.putWorker(updateWorker).subscribe((data: Worker) =>{
     console.log(data);
     console.log(updateWorker.jobsRequested)
     this.confirmationService.setConfirmationMessage("Your profile has been updated!");
     this.router.navigate(["/workerConfirmation"]);
    });

  });
  
   
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
