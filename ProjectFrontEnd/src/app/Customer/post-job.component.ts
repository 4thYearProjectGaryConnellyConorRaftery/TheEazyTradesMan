import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  constructor(private jobService: JobsService,  private router: Router) { }

   job: Job = {
    id : null,
    trade: null,
    description: null,
    customer: null,
    complete: null,
    requests: null,
    location: null,
    date: null
  };

  ngOnInit() { // Some default data for testing.
    this.job.customer = localStorage.getItem('CustomerID'); // Hard coded for now.
    this.job.complete = false;
    this.job.requests = "";
    this.job.date = "10/02/2019";
  }

   postJob(newJob: Job): void{
   // console.log(postJobForm.value);
   
   console.log(newJob);

   this.jobService.postJob(newJob).subscribe((data: Job) => {
      console.log(data);
    });
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
