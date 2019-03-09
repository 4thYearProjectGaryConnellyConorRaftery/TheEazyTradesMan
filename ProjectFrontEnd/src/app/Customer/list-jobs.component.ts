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

    if(localStorage.getItem('CustomerID') == "x"){
      this.message = "Only logged in customers can view this page.(try refreshing)" // For testing.
    }
    else{

    
    /*
    * Get a handle on all of the jobs.
     */
    this.jobService.getJobs().subscribe(data => {
        this.jobs = data
        this.listJobs = this.jobs.reverse();
        /*
        for(var i = 0; i < this.jobs.length; i++){
          //this.id = this.jobs[i].customer
          this.customerService.getCustomer(this.jobs[i].customer).subscribe(data =>{
            console.log(i)
            this.customer = data;
            
            this.jobs[this.x].customerName = this.customer.firstName + " " + this.customer.secondName ;
            this.x++
         
          })
        } */


      });

    }
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



