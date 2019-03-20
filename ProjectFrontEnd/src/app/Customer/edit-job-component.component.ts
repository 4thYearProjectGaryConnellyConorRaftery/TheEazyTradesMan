import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';

@Component({
  selector: 'app-edit-job-component',
  templateUrl: './edit-job-component.component.html',
  styleUrls: ['./edit-job-component.component.css']
})

/**
 * EditJobComponentComponent is the component that gets rendered when the Customer
 * clicks the "Edit Job" button on the myJobs component. This component displays
 * a form with the current Job details already filled in for the Customer.
 */
export class EditJobComponentComponent implements OnInit {

  constructor(
    private jobService: JobsService,
    private confirmationService: CustomerConfirmationService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  currentJob: Job;
  id: string;
  message: string = "";
  isCustomer: boolean = false;
  /* 
   * Create an empty job object to polulate from the form.
   */
  updateJob: Job;/* ={
    id: null,
    trade: "",
    description: "",
    customer: "",
    requests: "",
    complete: false,
    location: "",
    date: "",
    accepted: false,
    contact: ""

  }
  */
 

  /**
   * When the component gets initialized, check if it is a logged in customer, 
   * if it is, load up the data of the current Job in focus and fill out the 
   * form with those details.
   */
  ngOnInit() {

    if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else{
    this.isCustomer = true;
    

    this.id = this.jobService.getCurrentJob()

    this.jobService.getJob(this.id).subscribe(data => {
      this.updateJob = data;
    })
     if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page." // For testing.
    }

    console.log("no")
  
  }


  }


  /**
   * When the user fills out the form and pressed the "Update" button,
   * get a handle on the new Job information and call the PUT method to 
   * update that Job on the database.
   * @param job 
   */
  update(job: Job): void{
    /* 
     * Get a handle on the id of the job they are editing.
     */
  //  this.id = this.jobService.getCurrentJob()

  this.jobService.putJob(job).subscribe(data => {
    console.log(data)

    this.confirmationService.setConfirmationMessage("Your Job has been updated!")
    this.router.navigate(["/customerConfirmation"]);
  })



  }



   // Navigation.

  /**
    * When the user click on the "List Jobs" navigation button, redirect them
    * to listJobs component.
    */ 
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }


  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myJobs component.
   */
   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }


  /**
   * When the user click the "Post Job" navigation button, redirect
   * them to the postJob component.
   */
   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }


  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. 
   */
   logout(){
    this.authService.doLogout()
    .then((res) => {
      //this.location.back(); //login
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  // End Navigation.

}











 /* 
     * Get a handle on the current Job using its id.
     */
 //   this.jobService.getJob(this.id).subscribe(data => {
 //     this.currentJob = data;

      /*
       * Update the fields of the Job with the data they filed into the forms. 
       */

  //    this.currentJob.trade = job.trade;
  //    this.currentJob.description = job.description;
  //    this.currentJob.location = job.location;
  //    this.currentJob.contact = job.contact;

      /* 
       * Send the updated job through the web api to be updated on the database.
       */
   //   this.jobService.putJob(this.currentJob).subscribe(data => {
   //     console.log(data)
        /*
         * Set the confirmation message and navigate the user.
         */
    //    this.confirmationService.setConfirmationMessage("Your Job has been updated!")
     //   this.router.navigate(["/customerConfirmation"]);
    //  })
  //  })

