import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { Worker } from '../models/worker.model';
import { JobsService } from '../Services/jobs.service';
import { WorkersService } from '../Services/workers.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  worker: Worker;
  jobs: Job[] = [];
  job: Job;
  requests: string[];

  constructor(
   private workerService: WorkersService,
   private jobService: JobsService) { }

  ngOnInit() {
    this.workerService.getWorker(localStorage.getItem('WorkerID')).subscribe(data => {
      this.worker = data;

      this.requests = this.worker.jobsRequested.split(" ");

     

      for(var i =0; i < this.requests.length; i++){
       console.log("Length of requests --->" + this.requests.length)
       console.log(this.requests[i].length)
       console.log("This is the request at " + i + " " + this.requests[i])
      if(this.requests[i].length > 3){
          this.jobService.getJob(this.requests[i]).subscribe(data => {
            
            this.job = data;
            console.log("////" + typeof this.job)
            console.log("Request ID ---> " + this.job.id)
            console.log(this.job)
            this.jobs.push(this.job)
          
            //this.jobs[i] = this.job;
          })
      }
      }


    })
  }

}
