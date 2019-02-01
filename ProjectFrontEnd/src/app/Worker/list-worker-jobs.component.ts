import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-list-worker-jobs',
  templateUrl: './list-worker-jobs.component.html',
  styleUrls: ['./list-worker-jobs.component.css']
})
export class ListWorkerJobsComponent implements OnInit {

  jobs: Job[] =[
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
    description: "Need somone to build a table for the garden that is outside in my back garden with all the other tables in it",
    customer: "464646464646",
    requests: "46464646464646",
    isCompleted: false,
    location: "Galway, Ireland",
    date: "03-03-2019"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
