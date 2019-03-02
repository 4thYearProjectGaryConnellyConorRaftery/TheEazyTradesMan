import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  jobs: Job[];
  constructor(private jobService: JobsService,  
  private router: Router, 
  private geoMap: GeocodeService,
  private authService: AuthService) { }

  ngOnInit() {
    /*
    * Get a handle on all of the jobs.
     */
    this.jobService.getJobs().subscribe(data => this.jobs = data);
  }

  /* 
   * When the user clicks on view map.
   */
  getMap(job: Job){

    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);

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

   logout(){
    this.authService.doLogout()
    .then((res) => {
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  // End Navigation.

}



