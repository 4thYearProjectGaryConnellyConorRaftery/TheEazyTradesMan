import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { JobsService } from '../Services/jobs.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  jobRequests: string[];

  constructor(private jobService: JobsService,   private router: Router) { }

  ngOnInit() {
    this.jobRequests = this.jobService.getJobRequests();
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
