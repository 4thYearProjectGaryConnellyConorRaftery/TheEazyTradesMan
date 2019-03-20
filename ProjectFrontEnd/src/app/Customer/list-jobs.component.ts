import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { GeocodeService } from '../GeomapService/geocode.service';
import { AuthService } from '../core/auth.service';
import { CustomersService } from '../Services/customers.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})

/**
 * ListJobsComponent is the initial component that gets rendered when a Customer logs in.
 * This component is only responsible for listing the Jobs for the Customer to see, this is
 * to give the Customer a feel for how they should post Jobs themselves and what kind of conventions
 * to follow.
 */
export class ListJobsComponent implements OnInit {

  firstName: string = "";
  secondName: string = "";
  message: string = "";
  customer: Customer;
  jobs: Job[];
  listJobs: Job[] = [];
  x: number = 0; 
  constructor(private jobService: JobsService,  
  private router: Router, 
  private geoMap: GeocodeService,
  private authService: AuthService,
  private customerService: CustomersService) { }

  ngOnInit() {

    /**
     * If the user is a Customer, then let them see the data.
     */
    if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page.(try refreshing)" // For testing.
    }
    else{

    
  /** 
    * Get a handle on all of the jobs.
    */
    this.jobService.getJobs().subscribe(data => {
        this.jobs = data
        this.listJobs = this.jobs.reverse();
      });

    }
  }

  /**
   * When the user clicks on "View map".
   */
  getMap(job: Job){
    this.geoMap.setAddress(job.location);
    this.router.navigate(["/gmap"]);
  }

  // Navigation.

  /**
    * When the user click on the "List Jobs" navigation button, redirect them
    * to listJobs component.
    */
  navListJobs(): void{
    this.router.navigate(["/listJobs"]);
  }


  /**
   * When the user clicks "My Jobs" navigation button, redirect them to
   * the myJobs component.
   */
   navMyJobs(): void{
    this.router.navigate(["/myJobs"]);
  }


  /**
   * When the user click the "Post Job" navigation button, redirect
   * them to the postJob component.
   */
   navPostJob(): void{
    this.router.navigate(["/postJob"]);
  }


  /**
   * When the user clicks the "Logout" navigation button, logout 
   * that user and redirect them to the login page. 
   */
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



