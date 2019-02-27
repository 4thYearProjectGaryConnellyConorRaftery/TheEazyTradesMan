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

  updateJob: Job ={
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
 

  ngOnInit() {
  }

  update(job: Job): void{
   // console.log("Updating this Job ---> " + job.description);
    this.id = this.jobService.getCurrentJob()
   // console.log("Current Job ID: ---> " + this.id)

    this.jobService.getJob(this.id).subscribe(data => {
      this.currentJob = data;

      /*
      * Update the fields of the Job. 
      */

      this.currentJob.trade = job.trade;
      this.currentJob.description = job.description;
      this.currentJob.location = job.location;
      this.currentJob.contact = job.contact;

      this.jobService.putJob(this.currentJob).subscribe(data => {
        console.log(data)
        this.confirmationService.setConfirmationMessage("Your Job has been updated!")
        this.router.navigate(["/customerConfirmation"]);
      })
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
