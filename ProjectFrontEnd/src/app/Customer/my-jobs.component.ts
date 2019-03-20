import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})

/**
 * MyJobsComponent is the component that gets rendered when the Customer navigates to "My Jobs"
 * on the task bar. This component allows the Customer to manage the Jobs that they have posted
 * by allowing them to view the profiles of the Workers that requested their jobs, as well as 
 * edit their Jobs and delete their Jobs.
 */
export class MyJobsComponent implements OnInit {

  
  /*
   * Get a handle on all of the jobs.
   */
  jobs: Job[];
  message: string = "";
 
  /*
   * Used to select the jobs that belong to this user.
   */
  myJobs: Job[];
  /** 
   * Get a handle on the id of the current user.
   */
  customer: string = localStorage.getItem('CustomerID'); 

  constructor(private confirmationService: CustomerConfirmationService, private jobService: JobsService,  private router: Router, private geoMap: GeocodeService, private authService: AuthService) { }


   /**
    * If the user is a Customer, then let them see the data.
    */
  ngOnInit() {

    if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page." // For testing.
    }
    else{

    
    /** 
     * Get a handle on all of the jobs.
     */
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data
      this.jobs.reverse();
    });

  }
  }

   /** 
    * When the user wants to view the map of this current job.
    */
   getMap(job: Job){

    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);

  }

  /** 
   * When the user whants to view the requests for that current job.
   * @param job, the Job the Customer wants to request.
   */
  requests(job: Job): void{
    console.log("Before service - " + job.requests);
    /** 
     * Set the job requests  to the requests for this hob on the service.
     */
    this.jobService.setJobRequests(job.requests);
    /** 
     * Set the current job to this job on the service.
     */
    this.jobService.setCurrentJob(job.id);
    /** 
     * Navigate the user.
     */
    this.router.navigate(['/requestDetails']);

  }
 /** 
  * When the user clicks on edit job.
  * @param job, the Job the Customer wants to edit.
  */
  edit(job: Job): void{
    /** 
     * Set the current job to this job on the service.
     */
    this.jobService.setCurrentJob(job.id);
    console.log("This Job to be edited ---> " + job.id)
    /** 
     * Navigate the user.
     */
    this.router.navigate(['/editJob']);

  }

  /**
   * When the user wants to delete the Job.
   * @param job, the Job the Customer wants to delete.
   */
  remove(job: Job): void{
    this.jobService.deleteJob(job).subscribe(data =>{
      console.log(data)
      this.confirmationService.setConfirmationMessage("This Job has been permanently removed from the system.")
      this.router.navigate(["/customerConfirmation"])
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

