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
 
  /*
   * Get a handle on the current worker the user is trying to view.
   */
  workerid: string;
  worker: Worker;

  ngOnInit() {
    /*
     * Get a handle on the current worker the user is trying to view.
     */
    this.workerid = this.customerService.getCurrentWorker();
    
    this.workerService.getWorker(this.workerid).subscribe(data =>{
      this.worker = data
      this.ratingArray = this.worker.rating.split(",")
      this.amount = parseInt(this.ratingArray[0])
      this.sum = parseInt(this.ratingArray[1]) 
      this.worker.displayedRating = (this.sum/this.amount).toFixed().toString()
      
    })
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
