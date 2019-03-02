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
export class RequestDetailsComponent implements OnInit {

  jobRequests: string[];
  currentJobId: string;
  currentJob: Job;
  worker: Worker;
  workers: Worker[] = [];
  tempWorker: Worker;

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
    /*
     * Get a handle on the current job requests.
     */
    this.jobRequests = this.jobService.getJobRequests();
    /*
     * Loop through the requests to get a handle on the worker that each
     * request belongs to. Then add that worker to the workers array.
     */
    for(var i = 0; i < this.jobRequests.length; i++){
      this.workerService.getWorker(this.jobRequests[i]).subscribe(data => {
        this.tempWorker = data;
        console.log("Hopefully ---> " + this.tempWorker.id)
        this.ratingArray = this.tempWorker.rating.split(",")
        this.amount = parseInt(this.ratingArray[0])
        this.sum = parseInt(this.ratingArray[1]) 
        this.tempWorker.displayedRating = (this.sum/this.amount).toFixed().toString()
        this.workers.push(this.tempWorker)
      })
    } // End for.
    /*
     * Get a handle on the current job that these requests belong to.
     */
    this.currentJobId = this.jobService.getCurrentJob();
    this.jobService.getJob(this.currentJobId).subscribe(data => this.currentJob = data)
  }
    /*
     * When the user accepts a requests.
     */
  acceptRequest(requestId: string): void{ // The request ID is the workers ID that requested this job.
    console.log("Current Job ---> " + this.currentJobId)
    console.log("Is accepted: ---> " + this.currentJob.accepted)
    /*
     * Set the accepted boolean on this job to true, and update the job on the server side.
     */
    this.currentJob.accepted = true;
    this.jobService.putJob(this.currentJob).subscribe((data: Job) => {
      console.log("Job has been accepted!")
    })

   /*  Get the worker that made this request by passing {{request}} to this method as a 
    *  parameter. Put a field on the Worker model that contains all the jobs that have been
    *  accepted for them. Then populate this field by doing "this.currentJob.id" and passing
    *  that as a parameter to an update worker method. 
    */

    this.workerService.getWorker(requestId).subscribe(data => {
      this.worker = data;
      this.worker.jobsAccepted += " " + this.currentJobId; // Concatonating this job to the other accepted job ids that worker has.
      this.workerService.putWorker(this.worker).subscribe((data: Worker) =>{
        console.log(data);
        /* 
         * Set the confirmation message and navigate the user.
         */
        this.confirmation.setConfirmationMessage("Job accepted! A notification will now be sent to the corresponding worker.");
        this.router.navigate(["/customerConfirmation"]);
      })
    });
    

  }//End acceptRequest

  /////////////////////////////////////
  jobComplete(id: string){
    this.customersService.setCurrentWorker(id)
    this.router.navigate(["/reviewJob"]);
  }
  ////////////////////////////////////

  // View Profile:
  viewProfile(id: string): void{
    this.customersService.setCurrentWorker(id)

    this.router.navigate(["/workerProfile"]);
    

  }

  // Navigation.
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }

   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }

   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }

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
