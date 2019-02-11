import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  constructor(private jobService: JobsService) { }

   job: Job = {
    id : null,
    trade: null,
    description: null,
    customer: null,
    isCompleted: null,
    requests: null,
    location: null,
    date: null
  };

  ngOnInit() { // Some default data for testing.
    this.job.customer = "0000110101010";
    this.job.isCompleted = false;
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

}
