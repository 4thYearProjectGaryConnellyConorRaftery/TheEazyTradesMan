import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';

@Component({
  selector: 'app-list-worker-jobs',
  templateUrl: './list-worker-jobs.component.html',
  styleUrls: ['./list-worker-jobs.component.css']
})
export class ListWorkerJobsComponent implements OnInit {

  jobs: Job[];
  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(data => this.jobs = data);
  }

  request(job: Job): void{
    console.log("Testing JobRequests branch.");
    console.log("REQUEST FOR -->" + job.id);
    job.requests += ",-----ThisIsATestID-----";
    this.jobService.putJob(job).subscribe((data: Job) =>{
      console.log(data);
    });
  }

}


