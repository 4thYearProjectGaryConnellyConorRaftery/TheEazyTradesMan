import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  jobs: Job[];
  myJobs: Job[];
  customer: string = "59035e71-fd02-4ee0-83a0-2db5dbdc2f07";

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(data => this.jobs = data);
    //console.log("Jobs --->" + this.jobs);
   // this.init();
  }

  init(): void{
     var i: number = 0;
 
    for(i = 0; i < this.jobs.length; i++){
      if(this.jobs[i].customer == "59035e71-fd02-4ee0-83a0-2db5dbdc2f07"){
        this.myJobs.push(this.jobs[i]);
      }
    }
  }

}

/* =[
    {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table for the garden that is outside in my back garden with all the other tables in it",
    customer: "464646464646",
    requests: "46464646464646",
    complete: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
  },
  {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table for the garden that is outside in my back garden with all the other tables in it",
    customer: "464646464646",
    requests: "46464646464646",
    complete: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
  },
  {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table for the garden that is outside in my back garden with all the other tables in it",
    customer: "464646464646",
    requests: "46464646464646",
    complete: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
    }
  ];*/
