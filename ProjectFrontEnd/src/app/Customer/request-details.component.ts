import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { JobsService } from '../Services/jobs.service';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { WorkersService } from '../Services/workers.service';
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
  workers: Worker[];

  constructor(
     private jobService: JobsService,
     private router: Router,
     private workerService: WorkersService,
     private confirmation: CustomerConfirmationService,
     private authService: AuthService) { }

  ngOnInit() {
    this.jobRequests = this.jobService.getJobRequests();
    /////////////////////////////////////////////////////
  //  for(var i = 0; i < this.jobRequests.length; i++){
    //  this.wor
   // }
    /////////////////////////////////////////////////////
    this.currentJobId = this.jobService.getCurrentJob();
    this.jobService.getJob(this.currentJobId).subscribe(data => this.currentJob = data)
  }

  acceptRequest(requestId: string): void{ // The request ID is the workers ID that requested this job.
    console.log("Current Job ---> " + this.currentJobId)
    console.log("Is accepted: ---> " + this.currentJob.accepted)
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
      this.worker.jobsAccepted += " " + this.currentJobId;
      this.workerService.putWorker(this.worker).subscribe((data: Worker) =>{
        console.log(data);
        this.confirmation.setConfirmationMessage("Job accepted! A notification will now be sent to the corresponding worker.");
        this.router.navigate(["/customerConfirmation"]);
      })
    });
    

  }//End acceptRequest

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
