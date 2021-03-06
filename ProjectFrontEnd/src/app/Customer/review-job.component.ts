import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Worker } from '../models/worker.model';
import { AuthService } from '../core/auth.service';
import { CustomersService } from '../Services/customers.service';
import { WorkersService } from '../Services/workers.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';
import { JobsService } from '../Services/jobs.service';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-review-job',
  templateUrl: './review-job.component.html',
  styleUrls: ['./review-job.component.css']
})

/**
 * ReviewJobComponent is the component that gets rendered when the Customer
 * clicks on Job complete for a particular Worker. This component allows the 
 * Customer to rate the Job that the Worker did, this rating then gets calculated
 * and the average of all of the ratings that a Worker recieves is the overall 
 * rating for that Worker.
 */
export class ReviewJobComponent implements OnInit {

  constructor(
    private router:  Router,
    private workerService: WorkersService,
    private customerService: CustomersService,
    private confirmation: CustomerConfirmationService,
    private authService: AuthService,
    private jobService: JobsService
  ) { }
  currentJobId: string;
  currentJob: Job;

  rating: number = null;
  workerRatings: string[] = [];
  amount: number = null;
  sum: number = null;
  total: string = "";
  errorMessage: string = "";
  /** 
   * Get a handle on the current worker the user is trying to view.
   */
  workerid: string;
  worker: Worker;
  ngOnInit() {
    
  }

  /**
   * When the user clicks submit on the review form.
   */
  showRating(){
    console.log(this.rating)

    /**
     * Error checking to make sure the input is between 0 and 100.
     */
    if(this.rating > 0 && this.rating <= 100){

    
    /** 
     * Get a handle on the current worker the user is trying to rate.
     */
    this.workerid = this.customerService.getCurrentWorker();
    
    /**
     * Get a handle on the Worker object the user is rating.
     */
    this.workerService.getWorker(this.workerid).subscribe(data =>{
      this.worker = data
      this.workerRatings = this.worker.rating.split(",") // Split the tuple by comma.
      /**
       * The format for the rating of a Worker is "amount,sum" where amount is the
       * amount of times that Worker has been rated and sum is the total sum of all of 
       * those ratings. Therefore, it is required to split the rating by the comma, and
       * get the integer values of both of the elements in the resulting array. That way 
       * we can add 1 to the amount and add whatever was entered into the rating form
       * onto the sum. We then concatonate those two values, turn them into a string
       * and separate them by a comma.
       */
      this.amount = parseInt(this.workerRatings[0])
      console.log(" Before parsing ---> " + this.workerRatings[1])
      this.sum = parseInt(this.workerRatings[1])
      console.log(typeof  this.rating)
      this.amount ++;
      this.sum = (this.sum + (+this.rating));
      console.log("Amount ---> " + this.amount.toString())
      console.log("Sum ---> " + this.sum)
      this.total = this.amount.toString() + "," + this.sum.toString()
      console.log( "This is the new total " + this.total)
      this.worker.rating = this.total;
      
      /**
       * Update that Worker on the database.
       */
      this.workerService.putWorker(this.worker).subscribe(data =>{
        console.log(data)
        this.confirmation.setConfirmationMessage("Your rating has succsessfully gone through")
        this.router.navigate(["/customerConfirmation"]);

         /** 
          * Get a handle on the current job that these requests belong to, as to set the 
          * completed boolean to true.
          */
        this.currentJobId = this.jobService.getCurrentJob();
        this.jobService.getJob(this.currentJobId).subscribe(data => {
          this.currentJob = data
          this.currentJob.complete = true;
         
          this.jobService.putJob(this.currentJob).subscribe(data =>{
            console.log(data)
            
          })
        })
      })

    })
  }
    //end if

    /**
     * If the input is not in between 0 and 100.
     */
    else{
      this.confirmation.setConfirmationMessage("Error: Rating must be between 0 and 100.")
        this.router.navigate(["/customerConfirmation"]);

    }
  }


  /**
   * If the user presses "Cancel on the review form., redirect them back to listJobs."
   */
  cancel(){
    this.router.navigate(["/listJobs"])
  }

}
