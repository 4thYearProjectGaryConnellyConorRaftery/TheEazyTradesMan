import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

/**
 * PostJobComponent is the component that gets rendered to the Customer when they navigate
 * to "Post Job" on the navigation menu. This component allows for the creation of new Job
 * objects on the database.
 */
export class PostJobComponent implements OnInit {

  constructor(private jobService: JobsService, private confirmationService: CustomerConfirmationService,  private router: Router, private authService: AuthService) { }

  message: string = "";
  isCustomer: boolean = false;
  /*
   * Create a blank job object for the user to fill out.
   */
   job: Job = {
    id : null,
    trade: null,
    description: null,
    customer: null,
    complete: null,
    requests: null,
    location: null,
    date: null,
    accepted: null,
    contact: null,
  };
  
 
   /**
    * If the user is a Customer, then let them see the data.
    */
  ngOnInit() { 

    if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page." // For testing.
      console.log("here" + this.message)
    }
    else{
    this.isCustomer = true;

     /** 
     * Get a handle on the current user id and set it as a field for the job.
     */
    this.job.customer = localStorage.getItem('CustomerID'); // Hard coded for now.
    /** 
     * Set the default fields for the job.
     */
    this.job.complete = false;
    this.job.requests = "";
    
    /**
     * Calculate the current date so the Job can be time stamped.
     */
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = (today.getMonth() + 1).toString(); //January is 0!
    var yyyy = today.getFullYear().toString();
    this.job.date = (dd + "/" + mm + "/" + yyyy) 
    this.job.accepted = false;
    }
   
  }

   /**
    * When the user clicks "Post" on the form, post the Job to the web API 
    * through the Job service.
    * @param newJob, the Job to be created on the database.
    */
   postJob(newJob: Job): void{
   
   console.log(newJob);

   /** 
    * Post the job through the server side to be processed and added to the database.
    */
   this.jobService.postJob(newJob).subscribe((data: Job) => {
      console.log(data);
      /** 
       * Set the confirmation message and navigate the user.
       */
      this.confirmationService.setConfirmationMessage("Your Job has been posted!");
      this.router.navigate(["/customerConfirmation"]);
    });
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
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  // End Navigation.

}
