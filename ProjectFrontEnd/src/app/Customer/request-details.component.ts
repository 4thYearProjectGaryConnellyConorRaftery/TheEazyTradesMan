import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { JobsService } from '../Services/jobs.service';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
import { CustomersService } from '../Services/customers.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})

/**
 * RequestDetailsComponent is the component that gets rendered when the Customer clicks the
 * "View Requests" button on the myJobs component. This component allows the Customer to manage
 * the requests they have got for a Job. They can Accept a Job offer, view the profile of the 
 * worker that made the request, or they can complete the Job to give the Worker/s a rating on the Job.
 */
export class RequestDetailsComponent implements OnInit {

  jobRequests: string[];
  currentJobId: string;
  currentJob: Job;
  worker: Worker;
  workers: Worker[] = [];
  tempWorker: Worker;
  requestSet = new Set();

  // Rating stuff.
  ratingArray: string[] = [];
  amount: number = null;
  sum: number = null;

  constructor(
     private jobService: JobsService,
     private router: Router,
     private workerService: WorkersService,
     private confirmation: CustomerConfirmationService,
     private authService: AuthService,
     private customersService: CustomersService) { }

  ngOnInit() {
    /** 
     * Get a handle on the current job requests.
     */
    this.jobRequests = this.jobService.getJobRequests();

    for(let request of this.jobRequests){
      this.requestSet.add(request)
    }
    /** 
     * Loop through the requests to get a handle on the worker that each
     * request belongs to. Then add that worker to the workers array.
     */
    for(let request of this.requestSet){
      this.workerService.getWorker(request).subscribe(data => {
        this.tempWorker = data;
        console.log("Hopefully ---> " + this.tempWorker.id)
        this.ratingArray = this.tempWorker.rating.split(",")
        this.amount = parseInt(this.ratingArray[0])
        this.sum = parseInt(this.ratingArray[1]) 
        if(this.amount == 0 || this.sum == 0){
          this.tempWorker.displayedRating = "0"
        }
        else{
          this.tempWorker.displayedRating = (this.sum/this.amount).toFixed().toString()//
        }
        
        this.workers.push(this.tempWorker)
      })
    } // End for.
    /** 
     * Get a handle on the current job that these requests belong to.
     */
    this.currentJobId = this.jobService.getCurrentJob();
    this.jobService.getJob(this.currentJobId).subscribe(data => this.currentJob = data)
  }
    /**
     * When the user clicks "Accept" on a Job offer.
     * @param requestId, the id of the Worker that requested this Job.
     */
  acceptRequest(requestId: string): void{ // The request ID is the workers ID that requested this job.
    console.log("Current Job ---> " + this.currentJobId)
    console.log("Is accepted: ---> " + this.currentJob.accepted)
    /** 
     * Set the accepted boolean on this job to true, and update the job on the server side.
     */
    this.currentJob.accepted = true;
    this.jobService.putJob(this.currentJob).subscribe((data: Job) => {
      console.log("Job has been accepted!")
    })

   /** Get the worker that made this request by passing {{request}} to this method as a 
    *  parameter. Put a field on the Worker model that contains all the jobs that have been
    *  accepted for them. Then populate this field by doing "this.currentJob.id" and passing
    *  that as a parameter to an update worker method. 
    */

    this.workerService.getWorker(requestId).subscribe(data => {
      this.worker = data;
      this.worker.jobsAccepted += " " + this.currentJobId; // Concatonating this job to the other accepted job ids that worker has.
      this.workerService.putWorker(this.worker).subscribe((data: Worker) =>{
        console.log(data);
        /**  
         * Set the confirmation message and navigate the user.
         */
        this.confirmation.setConfirmationMessage("Job accepted! A notification will now be sent to the corresponding worker.");
        this.router.navigate(["/customerConfirmation"]);
      })
    });
    

  }//End acceptRequest

 
  /**
   * When the user clicks the "Job Complete" button on a Job request.
   * @param id, the id of the Worker that completed the Job. 
   */
  jobComplete(id: string){
    this.customersService.setCurrentWorker(id)
    this.router.navigate(["/reviewJob"]);
  }
 

  /**
   * When the user clicks the "View Profile" button on the request.
   * @param id, the id of the Worker whos profile the user wants to view.
   */
  viewProfile(id: string): void{
    this.customersService.setCurrentWorker(id)

    this.router.navigate(["/workerProfile"]);
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
