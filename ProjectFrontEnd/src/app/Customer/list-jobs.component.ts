import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  jobs: Job[];
  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(data => this.jobs = data);
  }

}



/* =[
    {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table for the garden that is outside in my back garden with all the other tables in it",
    customer: "464646464646",
    requests: "46464646464646",
    isCompleted: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
  },
  {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table",
    customer: "464646464646",
    requests: "46464646464646",
    isCompleted: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
  },
  {
    id: "46464646",
    trade: "Carpenter",
    description: "Need somone to build a table",
    customer: "464646464646",
    requests: "46464646464646",
    isCompleted: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
    }
  ];
*/