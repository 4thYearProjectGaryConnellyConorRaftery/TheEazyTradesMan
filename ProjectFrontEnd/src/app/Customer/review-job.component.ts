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
  /*
   * Get a handle on the current worker the user is trying to view.
   */
  workerid: string;
  worker: Worker;
  ngOnInit() {
    
  }

  showRating(){
    console.log(this.rating)
     /*
     * Get a handle on the current worker the user is trying to rate.
     */
    this.workerid = this.customerService.getCurrentWorker();
    
    this.workerService.getWorker(this.workerid).subscribe(data =>{
      this.worker = data
      this.workerRatings = this.worker.rating.split(",") // Split the tuple by comma
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
      //this.total = (this.sum / this.amount);
      this.worker.rating = this.total;
      this.workerService.putWorker(this.worker).subscribe(data =>{
        console.log(data)
        this.confirmation.setConfirmationMessage("Your rating has succsessfully gone through")
        this.router.navigate(["/customerConfirmation"]);

         /*
          * Get a handle on the current job that these requests belong to.
          */
        this.currentJobId = this.jobService.getCurrentJob();
        this.jobService.getJob(this.currentJobId).subscribe(data => {
          this.currentJob = data
          this.currentJob.complete = true;
          console.log("Yurt")
          this.jobService.putJob(this.currentJob).subscribe(data =>{
            console.log(data)
            //this.router.navigate(["/listJobs"])
          })
        })
       

      })

    })
  }

}
