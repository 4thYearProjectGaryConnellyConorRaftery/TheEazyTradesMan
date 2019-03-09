import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from '../models/job.model';
import { JobsService } from '../Services/jobs.service';
import { Router, Params } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CustomerConfirmationService } from '../Services/customerConfirmation.service';

@Component({
  selector: 'app-edit-job-component',
  templateUrl: './edit-job-component.component.html',
  styleUrls: ['./edit-job-component.component.css']
})
export class EditJobComponentComponent implements OnInit {

  constructor(
    private jobService: JobsService,
    private confirmationService: CustomerConfirmationService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  currentJob: Job;
  id: string;
  /* 
   * Create an empty job object to polulate from the form.
   */
  updateJob: Job;/* ={
    id: null,
    trade: "",
    description: "",
    customer: "",
    requests: "",
    complete: false,
    location: "",
    date: "",
    accepted: false,
    contact: ""

  }
  */
 

  ngOnInit() {

    this.id = this.jobService.getCurrentJob()

    this.jobService.getJob(this.id).subscribe(data => {
      this.updateJob = data;
    })


  }


  /* 
   * When the user fills the form and presses update.
   */

  update(job: Job): void{
    /* 
     * Get a handle on the id of the job they are editing.
     */
  //  this.id = this.jobService.getCurrentJob()

  this.jobService.putJob(job).subscribe(data => {
    console.log(data)

    this.confirmationService.setConfirmationMessage("Your Job has been updated!")
    this.router.navigate(["/customerConfirmation"]);
  })








    /* 
     * Get a handle on the current Job using its id.
     */
 //   this.jobService.getJob(this.id).subscribe(data => {
 //     this.currentJob = data;

      /*
       * Update the fields of the Job with the data they filed into the forms. 
       */

  //    this.currentJob.trade = job.trade;
  //    this.currentJob.description = job.description;
  //    this.currentJob.location = job.location;
  //    this.currentJob.contact = job.contact;

      /* 
       * Send the updated job through the web api to be updated on the database.
       */
   //   this.jobService.putJob(this.currentJob).subscribe(data => {
   //     console.log(data)
        /*
         * Set the confirmation message and navigate the user.
         */
    //    this.confirmationService.setConfirmationMessage("Your Job has been updated!")
     //   this.router.navigate(["/customerConfirmation"]);
    //  })
  //  })







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
