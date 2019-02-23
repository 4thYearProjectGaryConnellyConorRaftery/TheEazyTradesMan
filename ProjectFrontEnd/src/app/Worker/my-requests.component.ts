import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { JobsService } from '../Services/jobs.service';
import { WorkersService } from '../Services/workers.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  worker: Worker;
  jobs: Job[] = [];
  acceptedJobs: Job[] = [];
  job: Job;
  acceptedJob: Job;
  requests: string[];
  accepts: string[];

  constructor(
   private workerService: WorkersService,
   private jobService: JobsService,
   private router: Router) { }

  ngOnInit() {
      this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
      this.worker = data;

      this.requests = this.worker.jobsRequested.split(" ");
      this.accepts = this.worker.jobsAccepted.split(" ");
      console.log("This Worker ---> " + this.worker.id);

     /* Need to loop through each string array to compare each element.
      * If any of them match, add them to an array of stings.
      *
      */

     

      for(var i =0; i < this.requests.length; i++){
       console.log("Length of requests --->" + this.requests.length)
       console.log(this.requests[i].length)
       console.log("This is the request at " + i + " " + this.requests[i])
      if(this.requests[i].length > 1){ // 1 was just picked randomley because a check for null wasn't working.
          this.jobService.getJob(this.requests[i]).subscribe(data => {
            
            this.job = data;
            console.log("Number of jobs that were accepted for this worker ---> " + this.accepts.length)
            console.log("Request ID ---> " + this.job.id)
            console.log(this.job)
            if(this.job.accepted == false){
              this.jobs.push(this.job) // So we only list requested jobs that have not yet been accepted.
            }
            
          
            //this.jobs[i] = this.job;
          })
      }
    }// End for.
    
    for(var i = 0; i < this.accepts.length; i++){
      console.log("Length of accepted jobs array ---> " + this.accepts.length)
      console.log("---" + this.accepts[i] + "---")
      if(this.accepts[i] != "null"){
        this.jobService.getJob(this.accepts[i]).subscribe(data =>{
          this.acceptedJob = data;
          console.log("Accepted Job ID ---> " + this.acceptedJob.id)
          this.acceptedJobs.push(this.acceptedJob)
        });
      }
    }


    })
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

  // End Navigation.

}
