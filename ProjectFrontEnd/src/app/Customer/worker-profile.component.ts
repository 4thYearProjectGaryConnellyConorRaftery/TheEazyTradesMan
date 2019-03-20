import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker.model';
import { Router, Params } from '@angular/router';
import { WorkersService } from '../Services/workers.service';
import { AuthService } from '../core/auth.service';
import { CustomersService } from '../Services/customers.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})

/**
 * WorkerProfileComponent gets rendered whenever a Customer clicks the "View
 * Profile" on a Job request. This component is only responsible for displaying 
 * the details of the Worker that made a request for the current Customers Job.
 */
export class WorkerProfileComponent implements OnInit {

  constructor(
    private router:  Router,
    private workerService: WorkersService,
    private customerService: CustomersService,
    private authService: AuthService
  ) { }

  ratingArray: string[] = [];
  amount: number = null;
  sum: number = null;
 
  
  workerid: string;
  worker: Worker;

  ngOnInit() {
    /** 
     * Get a handle on the current worker the user is trying to view.
     */
    this.workerid = this.customerService.getCurrentWorker();
    
    this.workerService.getWorker(this.workerid).subscribe(data =>{
      this.worker = data
      console.log("RATING --->" + this.worker.rating)
      this.ratingArray = this.worker.rating.split(",")
      this.amount = parseInt(this.ratingArray[0])
      this.sum = parseInt(this.ratingArray[1]) 


      /**
       * If this Worker has not been rated yet, just display '0'
       * instead of NaN.
       */
      if(this.amount == 0 || this.sum == 0){
        this.worker.displayedRating = "0"
      }
      else{

        /**
         * If the rating for this worker is not 0.
         * Get the rating by splitting the rating by the comma.
         * This is done because the format for the Worker rating is
         * "amount,sum", therfore, if we split this string by comma, parse
         * each individual string to an integer, then divide the sum by the amount
         * and round it to the nearest integer, we will have an overall average 
         * rating.
         */
        this.worker.displayedRating = (this.sum/this.amount).toFixed().toString()
      }
      
    })
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
      //this.location.back(); //login
       localStorage.setItem('CustomerID', "x")
      this.router.navigate(["/login"]);
    }, (error) => {
      console.log("Logout error", error);
    });
  }


  // End Navigation.

}
