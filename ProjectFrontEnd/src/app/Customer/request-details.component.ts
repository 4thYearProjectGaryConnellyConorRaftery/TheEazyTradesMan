import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { JobsService } from '../Services/jobs.service';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  jobRequests: string[];
  currentJobId: string;
  currentJob: Job;

  constructor(private jobService: JobsService,   private router: Router) { }

  ngOnInit() {
    this.jobRequests = this.jobService.getJobRequests();
    this.currentJobId = this.jobService.getCurrentJob();
    this.jobService.getJob(this.currentJobId).subscribe(data => this.currentJob = data)
  }

  acceptRequest(): void{
    console.log("Current Job ---> " + this.currentJobId)
    console.log("Is accepted: ---> " + this.currentJob.accepted)
    this.currentJob.accepted = true;
    this.jobService.putJob(this.currentJob).subscribe((data: Job) => {
      console.log("Job has been accepted!")
    })
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

  // End Navigation.


}
