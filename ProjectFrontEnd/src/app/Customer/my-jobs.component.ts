import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  
  /*
   * Get a handle on all of the jobs.
   */
  jobs: Job[];
  /*
   * Used to select the jobs that belong to this user.
   */
  myJobs: Job[];
  /*
   * Get a handle on the id of the current user.
   */
  customer: string = localStorage.getItem('CustomerID'); 

  constructor(private jobService: JobsService,  private router: Router, private geoMap: GeocodeService, private authService: AuthService) { }

  ngOnInit() {
    /*
     * Get a handle on all of the jobs.
     */
    this.jobService.getJobs().subscribe(data => this.jobs = data);
  }

   /*
    * When the user whants to cview the map of this current job.
    */
   getMap(job: Job){

    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);

  }

  /*
   * When the user whants to view the requests for that current job.
   */
  requests(job: Job): void{
    console.log("Before service - " + job.requests);
    /*
     * Set the job requests  to the requests for this hob on the service.
     */
    this.jobService.setJobRequests(job.requests);
    /*
     * Set the current job to this job on the service.
     */
    this.jobService.setCurrentJob(job.id);
    /*
     * Navigate the user.
     */
    this.router.navigate(['/requestDetails']);

  }
 /*
  * When the user clicks on edit job.
  */
  edit(job: Job): void{
    /*
     * Set the current job to this job on the service.
     */
    this.jobService.setCurrentJob(job.id);
    console.log("This Job to be edited ---> " + job.id)
    /*
     * Navigate the user.
     */
    this.router.navigate(['/editJob']);

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
      //this.location.back(); //login
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  // End Navigation.

}

